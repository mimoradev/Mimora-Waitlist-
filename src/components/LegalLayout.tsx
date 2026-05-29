import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export interface LegalNavItem {
    id: string;
    label: string;
}

interface LegalLayoutProps {
    title: string;
    lastUpdated: string;
    sections: LegalNavItem[];
    children: ReactNode;
    /** Optional intro line shown under the title */
    intro?: ReactNode;
}

/**
 * Smoothly scroll to a section, accounting for the sticky header height.
 */
function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function LegalLayout({ title, lastUpdated, sections, children, intro }: LegalLayoutProps) {
    const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Scroll-spy: highlight the section currently in view.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) {
                    setActiveId(visible[0].target.id);
                }
            },
            { rootMargin: '-100px 0px -65% 0px', threshold: 0 }
        );

        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sections]);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 z-50">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-[#666] hover:text-[#1E1E1E] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>
                </div>
            </div>

            <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-10 md:py-14">
                {/* Title block */}
                <div className="mb-8 md:mb-10">
                    <h1 className="text-[34px] md:text-[44px] font-bold text-[#1E1E1E] mb-3 leading-tight">
                        {title}
                    </h1>
                    <p className="text-[#666] text-sm">Last updated: {lastUpdated}</p>
                    {intro && <div className="mt-4 text-[#666] leading-relaxed max-w-[760px]">{intro}</div>}
                </div>

                {/* Mobile dropdown nav */}
                <div className="lg:hidden mb-8 sticky top-[57px] z-40 bg-white py-3 -mx-6 px-6 border-b border-gray-100">
                    <label htmlFor="legal-nav" className="sr-only">
                        Jump to section
                    </label>
                    <select
                        id="legal-nav"
                        value={activeId}
                        onChange={(e) => scrollToSection(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm font-medium text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#E84A7F]/30 focus:border-[#E84A7F]"
                    >
                        {sections.map(({ id, label }) => (
                            <option key={id} value={id}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-10">
                    {/* Desktop sticky sidebar nav */}
                    <aside className="hidden lg:block w-[260px] shrink-0">
                        <nav className="sticky top-[90px] max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#999] mb-3">
                                On this page
                            </p>
                            <ul className="space-y-1 border-l border-gray-200">
                                {sections.map(({ id, label }) => {
                                    const isActive = activeId === id;
                                    return (
                                        <li key={id}>
                                            <button
                                                type="button"
                                                onClick={() => scrollToSection(id)}
                                                className={`block w-full text-left -ml-px border-l-2 pl-4 py-1.5 text-sm transition-colors ${
                                                    isActive
                                                        ? 'border-[#E84A7F] text-[#E84A7F] font-semibold'
                                                        : 'border-transparent text-[#666] hover:text-[#1E1E1E]'
                                                }`}
                                            >
                                                {label}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </aside>

                    {/* Main content */}
                    <div className="min-w-0 flex-1 max-w-[820px]">{children}</div>
                </div>
            </div>
        </div>
    );
}

/* ----------------------------- Helper pieces ----------------------------- */

interface SectionProps {
    id: string;
    title: string;
    children: ReactNode;
}

/** A legal section with an anchor id and consistent heading + spacing. */
export function Section({ id, title, children }: SectionProps) {
    return (
        <section id={id} className="mb-12 scroll-mt-28">
            <h2 className="text-[24px] md:text-[26px] font-bold text-[#1E1E1E] mb-5 pb-2 border-b border-gray-100">
                {title}
            </h2>
            <div className="space-y-4 text-[#666] leading-relaxed">{children}</div>
        </section>
    );
}

interface SubHeadingProps {
    children: ReactNode;
}

/** A sub-heading inside a section. */
export function SubHeading({ children }: SubHeadingProps) {
    return <h3 className="text-[18px] font-semibold text-[#1E1E1E] mt-6 mb-3">{children}</h3>;
}

interface LegalTableProps {
    headers: ReactNode[];
    rows: ReactNode[][];
    /** Optional caption shown above the table */
    caption?: ReactNode;
}

/** A responsive, styled HTML table used across all legal pages. */
export function LegalTable({ headers, rows, caption }: LegalTableProps) {
    return (
        <div className="my-5">
            {caption && <p className="text-sm font-medium text-[#1E1E1E] mb-2">{caption}</p>}
            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-[#FFF0F5]">
                            {headers.map((h, i) => (
                                <th
                                    key={i}
                                    className="text-left font-semibold text-[#1E1E1E] px-4 py-3 border-b border-gray-200 whitespace-nowrap"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, ri) => (
                            <tr key={ri} className={ri % 2 === 1 ? 'bg-[#FAFAFA]' : 'bg-white'}>
                                {row.map((cell, ci) => (
                                    <td
                                        key={ci}
                                        className="px-4 py-3 border-b border-gray-100 text-[#444] align-top last:border-r-0"
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

interface CodeBlockProps {
    children: ReactNode;
}

/** A styled code/pre block for formulas. */
export function CodeBlock({ children }: CodeBlockProps) {
    return (
        <pre className="my-5 overflow-x-auto rounded-xl bg-[#1E1E1E] text-[#F5F5F5] p-5 text-[13px] leading-relaxed font-mono">
            <code>{children}</code>
        </pre>
    );
}

interface CalloutProps {
    children: ReactNode;
    tone?: 'pink' | 'amber';
}

/** A highlighted callout block for critical warnings / golden rules. */
export function Callout({ children, tone = 'pink' }: CalloutProps) {
    const styles =
        tone === 'amber'
            ? 'bg-[#FFF8E6] border-[#F0C36D]'
            : 'bg-[#FFF0F5] border-[#E84A7F]';
    return (
        <div className={`my-5 rounded-xl border-l-4 ${styles} px-5 py-4 text-[#444] leading-relaxed`}>
            {children}
        </div>
    );
}

/** Green "yes / shown" indicator used in checkout-display tables. */
export function Yes({ children }: { children?: ReactNode }) {
    return <span className="text-green-600 font-medium">✓{children ? ` ${children}` : ''}</span>;
}

/** Red "no / hidden" indicator used in checkout-display tables. */
export function No({ children }: { children?: ReactNode }) {
    return <span className="text-red-500 font-medium">✗{children ? ` ${children}` : ''}</span>;
}

export default LegalLayout;
