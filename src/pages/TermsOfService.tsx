import LegalLayout, {
    Section,
    SubHeading,
    LegalTable,
    Callout,
    type LegalNavItem,
} from '../components/LegalLayout';

const sections: LegalNavItem[] = [
    { id: 'customer-terms', label: '1. Terms for Customers' },
    { id: 'artist-terms', label: '2. Terms for Artists' },
    { id: 'dispute-resolution', label: '3. Dispute Resolution' },
    { id: 'agreement', label: '4. Agreement' },
];

function TermsOfService() {
    return (
        <LegalLayout
            title="Terms of Service"
            lastUpdated="2025 (Version 1.0)"
            sections={sections}
            intro={
                <>
                    <p>
                        These Terms govern your use of the Mimora platform as a Customer or an Artist. By registering
                        for and using Mimora, you agree to all terms set out below.
                    </p>
                    <p className="mt-1">
                        <strong>Contact:</strong>{' '}
                        <a href="mailto:legal@mimora.in" className="text-[#E84A7F] hover:underline">
                            legal@mimora.in
                        </a>{' '}
                        |{' '}
                        <a href="mailto:support@mimora.in" className="text-[#E84A7F] hover:underline">
                            support@mimora.in
                        </a>
                    </p>
                </>
            }
        >
            {/* 10. Terms for Customers */}
            <Section id="customer-terms" title="1. Terms for Customers">
                <SubHeading>Eligibility</SubHeading>
                <ul className="list-disc pl-6 space-y-1">
                    <li>
                        Minimum age: <strong>18 years</strong> to register independently
                    </li>
                    <li>
                        Minors may use the Platform only under supervision and consent of a parent or legal guardian
                        who assumes full responsibility
                    </li>
                    <li>
                        You warrant you have the legal capacity to enter a binding contract under the Indian Contract
                        Act, 1872
                    </li>
                </ul>

                <SubHeading>Account Security</SubHeading>
                <ul className="list-disc pl-6 space-y-1">
                    <li>You are solely responsible for maintaining confidentiality of your login credentials</li>
                    <li>
                        Report unauthorized account use immediately to{' '}
                        <a href="mailto:support@mimora.in" className="text-[#E84A7F] hover:underline">
                            support@mimora.in
                        </a>
                    </li>
                    <li>Multiple accounts for the same individual are prohibited</li>
                </ul>

                <SubHeading>Booking Process</SubHeading>
                <ol className="list-decimal pl-6 space-y-1">
                    <li>Browse Artist profiles and select a service</li>
                    <li>Submit a booking request</li>
                    <li>
                        Booking is confirmed only after: (a) Artist accepts AND (b) Customer completes full payment via
                        Cashfree
                    </li>
                    <li>
                        Calendar slot is blocked only after escrow confirmation — no slot is guaranteed without payment
                    </li>
                    <li>All charges are displayed before payment and locked — no recalculation after booking</li>
                </ol>

                <SubHeading>OTP — Critical Warning</SubHeading>
                <Callout tone="amber">
                    By sharing the OTP with the Artist, you confirm that the service has been delivered to your
                    satisfaction. <strong>Do NOT share the OTP</strong> if service has not been delivered or if you
                    have an unresolved dispute. Contact Mimora support before sharing in such cases.
                </Callout>

                <SubHeading>Customer Conduct</SubHeading>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Treat Artists with respect and professionalism</li>
                    <li>For at-home bookings, provide a safe, hygienic, and accessible environment</li>
                    <li>Do not solicit Artists for services outside the Platform — permanent ban may apply</li>
                    <li>Do not submit false reviews or fraudulent dispute claims</li>
                </ul>

                <SubHeading>Prohibited Activities</SubHeading>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Paying Artists directly for Platform-originated bookings</li>
                    <li>Misusing refund or dispute mechanisms with false claims</li>
                    <li>Sharing another customer's personal or booking information</li>
                    <li>Using bots, scrapers, or unauthorized scripts on the Platform</li>
                    <li>Attempting to reverse-engineer any aspect of the Platform</li>
                </ul>

                <SubHeading>Limitation of Liability</SubHeading>
                <p>Mimora is not liable for:</p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Quality, safety, or outcomes of beauty services delivered by Artists</li>
                    <li>Allergic reactions, skin conditions, or health issues from Artist-applied products</li>
                    <li>Loss of personal property at the service location</li>
                    <li>Indirect, incidental, or consequential damages</li>
                </ul>
                <p>
                    Mimora's total liability for any claim shall not exceed{' '}
                    <strong>the amount paid by the Customer for the specific booking in dispute.</strong>
                </p>
            </Section>

            {/* 11. Terms for Artists */}
            <Section id="artist-terms" title="2. Terms for Artists">
                <SubHeading>Independent Contractor Status</SubHeading>
                <p>
                    Artists operate exclusively as <strong>independent freelance contractors.</strong> No
                    employer-employee relationship, partnership, or joint venture is created. Artists are solely
                    responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Income tax filings and GST compliance (if applicable)</li>
                    <li>Professional licensing and insurance</li>
                    <li>Their own tools and consumable products</li>
                </ul>
                <p>
                    Mimora does not provide employment benefits (PF, ESI, gratuity, paid leave, health insurance).
                </p>

                <SubHeading>Service Delivery Obligations</SubHeading>
                <ul className="list-disc pl-6 space-y-1">
                    <li>
                        Accepting a booking = a <strong>binding commitment</strong> to deliver at the agreed date,
                        time, and location
                    </li>
                    <li>
                        Use only genuine, non-expired, hygienic, and skin-safe products — Artists are solely liable
                        for adverse reactions
                    </li>
                    <li>Services must be performed in safe and sanitary environments</li>
                </ul>

                <SubHeading>OTP — Critical Rule</SubHeading>
                <Callout tone="amber">
                    Artists must never coerce, pressure, or mislead Customers into sharing the OTP before the service
                    is fully and satisfactorily delivered. Fraudulent OTP collection is grounds for permanent removal.
                </Callout>

                <SubHeading>Artist Cancellation Consequences</SubHeading>
                <LegalTable
                    headers={['Consequence', 'Detail']}
                    rows={[
                        ['Customer refund', 'Automatic 100% refund regardless of timing or reason'],
                        ['Artist payout', 'Zero — no payout for any cancelled booking'],
                        ['Flexi advance', 'Advance fully returned to Customer as a financial penalty'],
                        ['Account impact', 'Repeated cancellations may result in suspension or reduced visibility'],
                    ]}
                />

                <SubHeading>Payment & Payout</SubHeading>
                <ul className="list-disc pl-6 space-y-1">
                    <li>
                        Artist payout = Artist's service price — <strong>Mimora never deducts from the Artist's
                        stated price</strong>
                    </li>
                    <li>Payouts processed via Cashfree typically <strong>within 1–3 business days</strong> after OTP confirmation</li>
                    <li>Tips belong entirely to the Artist — not subject to Platform commission</li>
                    <li>Direct payments for Platform-originated bookings are strictly prohibited</li>
                </ul>

                <SubHeading>Non-Solicitation</SubHeading>
                <p>
                    Artists must not directly solicit Customers introduced through the Platform for services outside
                    the Platform for <strong>12 months following the last booking.</strong> Violation may result in
                    civil liability in addition to account removal.
                </p>

                <SubHeading>Photography & Portfolio</SubHeading>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Photograph or video-record work only with <strong>explicit prior Customer consent</strong></li>
                    <li>Do not post identifiable Customer images on social media without documented consent</li>
                </ul>

                <SubHeading>Termination</SubHeading>
                <p>
                    Mimora may suspend or permanently remove Artist accounts for: Terms violations, repeated poor
                    quality, sustained low ratings, fraudulent activities, or conduct detrimental to the Platform's
                    reputation.
                </p>
                <p>
                    Artists may deactivate by providing <strong>48 hours' notice</strong> and honouring all accepted
                    bookings.
                </p>
            </Section>

            {/* 18. Dispute Resolution */}
            <Section id="dispute-resolution" title="3. Dispute Resolution">
                <SubHeading>Internal Process</SubHeading>
                <LegalTable
                    headers={['Step', 'Action', 'Timeline']}
                    rows={[
                        ['1 — Contact Support', 'Raise a dispute ticket via support@mimora.in or in-app within 48 hours of the disputed event', 'Within 48 hours of incident'],
                        ['2 — Review', 'Mimora reviews booking records, OTP logs, payment history, and evidence', '5–7 business days'],
                        ['3 — Decision', 'Written resolution issued; Cashfree instructed to release or refund as applicable', 'After review'],
                        ['4 — Escalation', 'If dissatisfied, parties may pursue resolution through competent courts or consumer forums', 'As applicable'],
                    ]}
                />
                <p>
                    <strong>
                        Claims must be raised within 90 days of the relevant event. Claims after this period may not be
                        entertained.
                    </strong>
                </p>

                <SubHeading>Governing Law</SubHeading>
                <p>These Terms are governed by the laws of India including:</p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Indian Contract Act, 1872</li>
                    <li>Information Technology Act, 2000 and amendments</li>
                    <li>Consumer Protection Act, 2019</li>
                    <li>Payment and Settlement Systems Act, 2007</li>
                    <li>Digital Personal Data Protection Act, 2023</li>
                </ul>
                <p>All disputes are subject to the exclusive jurisdiction of courts in [City, State], India.</p>

                <SubHeading>Force Majeure</SubHeading>
                <p>
                    Mimora is not liable for failure to perform any obligation due to causes beyond its reasonable
                    control — acts of God, government orders, internet disruptions, natural disasters, pandemics, or
                    third-party service provider failures (including Cashfree outages).
                </p>
            </Section>

            {/* 20. Agreement */}
            <Section id="agreement" title="4. Agreement">
                <p>
                    Mimora reserves the right to update these Terms at any time. Significant changes will be
                    communicated via registered email or in-app notification. Continued use of the Platform after
                    changes constitutes acceptance.
                </p>
                <p>
                    By registering for and using the Mimora platform, all users — Customers and Artists alike — confirm
                    they have read, understood, and unconditionally agree to all terms, policies, and conditions in this
                    document.
                </p>
                <LegalTable
                    headers={['Purpose', 'Contact']}
                    rows={[
                        ['Privacy & data requests', 'privacy@mimora.in'],
                        ['Legal', 'legal@mimora.in'],
                        ['Support', 'support@mimora.in'],
                    ]}
                />
                <p className="text-sm text-[#999]">© 2025 Mimora. All rights reserved.</p>
            </Section>
        </LegalLayout>
    );
}

export default TermsOfService;
