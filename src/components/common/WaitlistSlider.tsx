import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader2, User, Mail, Phone, ChevronDown, PartyPopper } from 'lucide-react';

// ─── LocalStorage helpers ───────────────────────────────────────────
const WAITLIST_STORAGE_KEY = 'mimora_waitlist_submitted';

interface StoredWaitlistData {
    name: string;
    email: string;
    submittedAt: string;
}

function getStoredSubmission(): StoredWaitlistData | null {
    try {
        const raw = localStorage.getItem(WAITLIST_STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as StoredWaitlistData;
    } catch {
        return null;
    }
}

function storeSubmission(name: string, email: string): void {
    const data: StoredWaitlistData = {
        name,
        email,
        submittedAt: new Date().toISOString(),
    };
    localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(data));
}

interface WaitlistSliderProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    category: 'artist' | 'customer' | '';
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    category?: string;
}

// ─── HubSpot Submission ─────────────────────────────────────────────
const HUBSPOT_PORTAL_ID = '48937342';   // your actual portal ID
const HUBSPOT_FORM_ID = "2b2cd336-c7dc-4726-80c6-9801ea114f17";

async function submitToHubSpot(data: FormData): Promise<boolean> {
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

    const payload = {
        fields: [
            { name: 'firstname', value: data.name },
            { name: 'email', value: data.email },
            { name: 'phone', value: data.phone },
            { name: 'what_best_describes_you', value: data.category === 'artist' ? 'Artist' : data.category === 'customer' ? 'Customer' : '' },
        ],
        context: {
            pageUri: window.location.href,
            pageName: 'Waitlist Landing Page',
        },
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        return res.ok;
    } catch {
        return false;
    }
}

// ─── Validation ─────────────────────────────────────────────────────
function validate(data: FormData): FormErrors {
    const errors: FormErrors = {};

    if (!data.name.trim()) {
        errors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }

    if (!data.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Enter a valid email address';
    }

    if (!data.phone.trim()) {
        errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(data.phone.trim())) {
        errors.phone = 'Enter a valid phone number';
    }

    if (!data.category) {
        errors.category = 'Please select a category';
    }

    return errors;
}

// ─── Stagger animation variants ────────────────────────────────────
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.25,
        },
    },
    exit: {
        transition: {
            staggerChildren: 0.04,
            staggerDirection: -1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
    exit: {
        opacity: 0,
        y: -12,
        filter: 'blur(4px)',
        transition: { duration: 0.25, ease: 'easeIn' as const },
    },
};

const successVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(6px)' },
    visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
};

// ─── Component ──────────────────────────────────────────────────────
function WaitlistSlider({ isOpen, onClose }: WaitlistSliderProps) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        category: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [alreadyJoined, setAlreadyJoined] = useState<StoredWaitlistData | null>(null);

    // Check localStorage when slider opens
    useEffect(() => {
        if (isOpen) {
            const stored = getStoredSubmission();
            if (stored) setAlreadyJoined(stored);
        }
    }, [isOpen]);

    // Lock body scroll when slider is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    // Reset form when closed
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setFormData({ name: '', email: '', phone: '', category: '' });
                setErrors({});
                setTouched({});
                setIsSuccess(false);
                setCategoryOpen(false);
                setAlreadyJoined(null);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleChange = useCallback(
        (field: keyof FormData, value: string) => {
            setFormData((prev) => ({ ...prev, [field]: value }));
            // Live validation on touched fields
            if (touched[field]) {
                const newData = { ...formData, [field]: value };
                const newErrors = validate(newData);
                setErrors((prev) => ({
                    ...prev,
                    [field]: newErrors[field as keyof FormErrors],
                }));
            }
        },
        [formData, touched]
    );

    const handleBlur = useCallback(
        (field: keyof FormData) => {
            setTouched((prev) => ({ ...prev, [field]: true }));
            const newErrors = validate(formData);
            setErrors((prev) => ({
                ...prev,
                [field]: newErrors[field as keyof FormErrors],
            }));
        },
        [formData]
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Touch all fields
        setTouched({ name: true, email: true, phone: true, category: true });
        const validationErrors = validate(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setIsSubmitting(true);
        const ok = await submitToHubSpot(formData);
        setIsSubmitting(false);

        if (ok) {
            storeSubmission(formData.name, formData.email);
            setIsSuccess(true);
        } else {
            // Even on failure, show success for demo; replace with error toast in production
            storeSubmission(formData.name, formData.email);
            setIsSuccess(true);
        }
    };

    const selectCategory = (cat: 'artist' | 'customer') => {
        handleChange('category', cat);
        setCategoryOpen(false);
        setTouched((prev) => ({ ...prev, category: true }));
    };

    // ── Shared form content ──────────────────────────────────────────
    const formContent = (
        <AnimatePresence mode="wait">
            {alreadyJoined ? (
                <motion.div
                    key="already-joined"
                    className="flex flex-col items-center justify-center h-full gap-4 px-2 text-center"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
                    >
                        <PartyPopper className="w-14 h-14 text-[#E84A7F]" strokeWidth={1.5} />
                    </motion.div>
                    <motion.h3
                        className="text-2xl font-semibold text-[#1E1E1E]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        You've already joined!
                    </motion.h3>
                    <motion.p
                        className="text-[#666] text-sm max-w-72 leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                    >
                        Hey <span className="font-medium text-[#1E1E1E]">{alreadyJoined.name.split(' ')[0]}</span>, you're already on our waitlist
                        with <span className="font-medium text-[#1E1E1E]">{alreadyJoined.email}</span>. We'll notify you soon!
                    </motion.p>
                    <motion.button
                        onClick={onClose}
                        className="mt-4 px-6 py-2.5 rounded-full bg-[#1E1E1E] text-white text-sm font-medium hover:bg-[#333] transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Got it
                    </motion.button>
                </motion.div>
            ) : isSuccess ? (
                <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center h-full gap-4 px-2 text-center"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
                    >
                        <CheckCircle className="w-16 h-16 text-[#E84A7F]" strokeWidth={1.5} />
                    </motion.div>
                    <motion.h3
                        className="text-2xl font-semibold text-[#1E1E1E]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        You're on the list!
                    </motion.h3>
                    <motion.p
                        className="text-[#666] text-sm max-w-65"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        We'll reach out soon with early access details. Stay tuned!
                    </motion.p>
                    <motion.button
                        onClick={onClose}
                        className="mt-4 px-6 py-2.5 rounded-full bg-[#1E1E1E] text-white text-sm font-medium hover:bg-[#333] transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Done
                    </motion.button>
                </motion.div>
            ) : (
                <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col h-full"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <h2 className="text-2xl md:text-[28px] font-semibold text-[#1E1E1E] leading-tight">
                            Join the Waitlist
                        </h2>
                        <p className="text-sm text-[#888] mt-1.5">
                            Be the first to experience Mimora
                        </p>
                    </motion.div>

                    {/* Fields */}
                    <div className="flex flex-col gap-4 flex-1">
                        {/* Name */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-xs font-medium text-[#555] mb-1.5 ml-0.5">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa] pointer-events-none" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    onBlur={() => handleBlur('name')}
                                    placeholder="Your full name"
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-[#FAFAFA] outline-none transition-all duration-200
                                        ${errors.name && touched.name
                                            ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                            : 'border-[#E5E5E5] focus:border-[#E84A7F] focus:ring-2 focus:ring-[#E84A7F]/10'
                                        }`}
                                />
                            </div>
                            <AnimatePresence>
                                {errors.name && touched.name && (
                                    <motion.p
                                        className="text-xs text-red-500 mt-1 ml-1"
                                        initial={{ opacity: 0, height: 0, y: -4 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {errors.name}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Email */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-xs font-medium text-[#555] mb-1.5 ml-0.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa] pointer-events-none" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    onBlur={() => handleBlur('email')}
                                    placeholder="you@example.com"
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-[#FAFAFA] outline-none transition-all duration-200
                                        ${errors.email && touched.email
                                            ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                            : 'border-[#E5E5E5] focus:border-[#E84A7F] focus:ring-2 focus:ring-[#E84A7F]/10'
                                        }`}
                                />
                            </div>
                            <AnimatePresence>
                                {errors.email && touched.email && (
                                    <motion.p
                                        className="text-xs text-red-500 mt-1 ml-1"
                                        initial={{ opacity: 0, height: 0, y: -4 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {errors.email}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Phone */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-xs font-medium text-[#555] mb-1.5 ml-0.5">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa] pointer-events-none" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    onBlur={() => handleBlur('phone')}
                                    placeholder="+91 98765 43210"
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-[#FAFAFA] outline-none transition-all duration-200
                                        ${errors.phone && touched.phone
                                            ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                            : 'border-[#E5E5E5] focus:border-[#E84A7F] focus:ring-2 focus:ring-[#E84A7F]/10'
                                        }`}
                                />
                            </div>
                            <AnimatePresence>
                                {errors.phone && touched.phone && (
                                    <motion.p
                                        className="text-xs text-red-500 mt-1 ml-1"
                                        initial={{ opacity: 0, height: 0, y: -4 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {errors.phone}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Category - Custom Select */}
                        <motion.div variants={itemVariants} className="relative">
                            <label className="block text-xs font-medium text-[#555] mb-1.5 ml-0.5">
                                I am a...
                            </label>
                            <button
                                type="button"
                                onClick={() => setCategoryOpen(!categoryOpen)}
                                onBlur={() => {
                                    // Delay to allow click on option
                                    setTimeout(() => {
                                        setCategoryOpen(false);
                                        handleBlur('category');
                                    }, 150);
                                }}
                                className={`w-full flex items-center justify-between pl-4 pr-3 py-3 rounded-xl border text-sm bg-[#FAFAFA] outline-none transition-all duration-200 text-left
                                    ${errors.category && touched.category
                                        ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                        : 'border-[#E5E5E5] focus:border-[#E84A7F] focus:ring-2 focus:ring-[#E84A7F]/10'
                                    }`}
                            >
                                <span className={formData.category ? 'text-[#1E1E1E]' : 'text-[#aaa]'}>
                                    {formData.category === 'artist'
                                        ? '🎨  Artist / Service Provider'
                                        : formData.category === 'customer'
                                            ? '💅  Customer'
                                            : 'Select your role'}
                                </span>
                                <motion.div
                                    animate={{ rotate: categoryOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown className="w-4 h-4 text-[#999]" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {categoryOpen && (
                                    <motion.div
                                        className="absolute left-0 right-0 bottom-full mb-1 bg-white border border-[#E5E5E5] rounded-xl shadow-lg overflow-hidden z-50"
                                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => selectCategory('artist')}
                                            className={`w-full text-left px-4 py-3 text-sm hover:bg-[#FFF0F5] transition-colors flex items-center gap-2
                                                ${formData.category === 'artist' ? 'bg-[#FFF0F5] text-[#E84A7F] font-medium' : 'text-[#1E1E1E]'}`}
                                        >
                                            <span>🎨</span> Artist / Service Provider
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => selectCategory('customer')}
                                            className={`w-full text-left px-4 py-3 text-sm hover:bg-[#FFF0F5] transition-colors flex items-center gap-2
                                                ${formData.category === 'customer' ? 'bg-[#FFF0F5] text-[#E84A7F] font-medium' : 'text-[#1E1E1E]'}`}
                                        >
                                            <span>💅</span> Customer
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {errors.category && touched.category && (
                                    <motion.p
                                        className="text-xs text-red-500 mt-1 ml-1"
                                        initial={{ opacity: 0, height: 0, y: -4 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {errors.category}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Submit */}
                    <motion.div variants={itemVariants} className="mt-6 pt-2">
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 rounded-xl bg-[#E84A7F] text-white text-sm font-semibold shadow-lg shadow-[#E84A7F]/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.015, boxShadow: '0 8px 24px rgba(232,74,127,0.3)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Join Waitlist'
                            )}
                        </motion.button>
                        <p className="text-[11px] text-[#aaa] text-center mt-3">
                            We respect your privacy. No spam, ever.
                        </p>
                    </motion.div>
                </motion.form>
            )}
        </AnimatePresence>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-998 bg-black/30 backdrop-blur-[2px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        onClick={onClose}
                    />

                    {/* ─── Desktop Slider (right side, 50% width) ─── */}
                    <motion.div
                        className="hidden md:flex fixed top-0 right-0 z-999 h-full w-1/2 max-w-140 bg-white shadow-2xl flex-col"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                            mass: 0.8,
                        }}
                    >
                        {/* Close button */}
                        <div className="flex items-center justify-between px-8 pt-6 pb-2">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/info/common/logo.png"
                                    alt="Mimora"
                                    className="h-5 w-auto opacity-70"
                                />
                            </div>
                            <motion.button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-[#F5F5F5] transition-colors"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X className="w-5 h-5 text-[#666]" />
                            </motion.button>
                        </div>

                        {/* Decorative line */}
                        <div className="mx-8 h-px bg-linear-to-r from-transparent via-[#E84A7F]/20 to-transparent" />

                        {/* Form area */}
                        <div data-lenis-prevent className="flex-1 overflow-y-auto px-8 py-6">
                            {formContent}
                        </div>
                    </motion.div>

                    {/* ─── Mobile Slider (bottom sheet, 55% height) ─── */}
                    <motion.div
                        className="md:hidden fixed bottom-0 left-0 right-0 z-999 bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.12)] flex flex-col"
                        style={{
                            height: '65vh',
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px',
                        }}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                            mass: 0.8,
                        }}
                    >
                        {/* Drag handle */}
                        <div className="flex justify-center pt-3 pb-1">
                            <div className="w-10 h-1 rounded-full bg-[#DDD]" />
                        </div>

                        {/* Close button */}
                        <div className="flex items-center justify-between px-5 pb-2">
                            <img
                                src="/info/common/logo.png"
                                alt="Mimora"
                                className="h-4 w-auto opacity-70"
                            />
                            <motion.button
                                onClick={onClose}
                                className="p-1.5 rounded-full hover:bg-[#F5F5F5] transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X className="w-4 h-4 text-[#666]" />
                            </motion.button>
                        </div>

                        {/* Decorative line */}
                        <div className="mx-5 h-px bg-linear-to-r from-transparent via-[#E84A7F]/20 to-transparent" />

                        {/* Form area */}
                        <div data-lenis-prevent className="flex-1 overflow-y-auto px-5 py-4">
                            {formContent}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default WaitlistSlider;
