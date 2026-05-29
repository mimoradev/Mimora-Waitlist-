import LegalLayout, {
    Section,
    SubHeading,
    LegalTable,
    CodeBlock,
    Callout,
    Yes,
    No,
    type LegalNavItem,
} from '../components/LegalLayout';

const sections: LegalNavItem[] = [
    { id: 'who-we-are', label: '1. Who We Are' },
    { id: 'data-we-collect', label: '2. What Data We Collect' },
    { id: 'why-we-collect', label: '3. Why We Collect Data' },
    { id: 'kyc', label: '4. KYC & Identity Verification' },
    { id: 'money-flow', label: '5. How Money Flows' },
    { id: 'secure-fee', label: '6. Secure Booking Fee & Discount' },
    { id: 'travel-charge', label: '7. Travel Charge Policy' },
    { id: 'cancellation', label: '8. Cancellation & Refund Policy' },
    { id: 'edge-cases', label: '9. Edge Cases & Special Scenarios' },
    { id: 'customer-terms', label: '10. Terms for Customers' },
    { id: 'artist-terms', label: '11. Terms for Artists' },
    { id: 'data-security', label: '12. Data Storage & Security' },
    { id: 'data-sharing', label: '13. Data Sharing' },
    { id: 'location-data', label: '14. Location Data' },
    { id: 'user-rights', label: '15. User Rights' },
    { id: 'data-retention', label: '16. Data Retention' },
    { id: 'childrens-privacy', label: "17. Children's Privacy" },
    { id: 'dispute-resolution', label: '18. Dispute Resolution' },
    { id: 'grievance-officer', label: '19. Grievance Officer' },
    { id: 'changes', label: '20. Changes to This Policy' },
    { id: 'agreement', label: 'Agreement' },
];

function PrivacyPolicy() {
    return (
        <LegalLayout
            title="Privacy Policy"
            lastUpdated="2025 (Version 1.0)"
            sections={sections}
            intro={
                <>
                    <p>
                        <strong>Version:</strong> 1.0 &nbsp;|&nbsp; <strong>Effective Date:</strong> 2025
                    </p>
                    <p className="mt-1">
                        <strong>Applicable Law:</strong> Indian Contract Act, 1872 | IT Act, 2000 | Consumer
                        Protection Act, 2019 | DPDP Act, 2023
                    </p>
                    <p className="mt-1">
                        <strong>Contact:</strong>{' '}
                        <a href="mailto:privacy@mimora.in" className="text-[#E84A7F] hover:underline">
                            privacy@mimora.in
                        </a>{' '}
                        |{' '}
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
            {/* 1. Who We Are */}
            <Section id="who-we-are" title="1. Who We Are">
                <p>
                    Mimora is an <strong>intermediary marketplace platform</strong> that connects independent
                    freelance beauty and wellness artists with customers seeking such services. Mimora does not
                    directly provide beauty or wellness services. It acts solely as:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>A technology facilitator</li>
                    <li>A payment escrow intermediary (via Cashfree)</li>
                    <li>A dispute facilitation platform</li>
                </ul>
                <p>
                    The service contract is between the <strong>Customer and the Artist</strong>. Mimora's
                    liability is limited to functions it directly controls — platform access, payment escrow, and
                    dispute facilitation.
                </p>
            </Section>

            {/* 2. What Data We Collect */}
            <Section id="data-we-collect" title="2. What Data We Collect">
                <SubHeading>2.1 Customer Data</SubHeading>
                <LegalTable
                    headers={['Category', 'Data Points']}
                    rows={[
                        ['Identity', 'Name, email address, mobile number'],
                        ['Account', 'Login credentials (password stored as bcrypt hash — never plaintext)'],
                        ['Booking', 'Service history, booking dates, locations, package selections'],
                        [
                            'Payment',
                            'Payment method type, UPI handle / masked card details (full card data handled only by Cashfree — not stored by Mimora)',
                        ],
                        ['Location', 'GPS location for travel charge calculation and Artist matching'],
                        ['Device & Usage', 'Device type, OS, app version, IP address, session logs'],
                        ['Reviews', 'Ratings and review text submitted after completed bookings'],
                    ]}
                />

                <SubHeading>2.2 Artist Data</SubHeading>
                <LegalTable
                    headers={['Category', 'Data Points']}
                    rows={[
                        ['Identity', 'Name, mobile number, email address, profile photograph'],
                        [
                            'KYC',
                            'PAN Card or Aadhaar number (processed via DigiLocker / KYC partner — raw documents not stored on Mimora servers)',
                        ],
                        [
                            'Identity Verification',
                            'Live facial recognition capture, face-match result (Verified / Not Verified)',
                        ],
                        ['Payment', 'Bank account number + IFSC or UPI handle (stored securely for Cashfree payout)'],
                        ['Professional', 'Service listings, pricing, availability calendar, portfolio photographs'],
                        ['Booking & Payout', 'Booking history, OTP confirmation records, payout transaction history'],
                        ['Device & Usage', 'Device type, OS, app version, IP address, session logs'],
                        ['Location', 'Location data for booking delivery and travel charge calculations'],
                    ]}
                />
            </Section>

            {/* 3. Why We Collect Data */}
            <Section id="why-we-collect" title="3. Why We Collect Data (Purpose)">
                <LegalTable
                    headers={['Purpose', 'Description']}
                    rows={[
                        [
                            'Service Facilitation',
                            'Matching Customers with Artists, processing bookings, OTP confirmation, and coordinating delivery',
                        ],
                        [
                            'Payment Processing',
                            'Creating Cashfree payment orders, managing escrow, processing Artist payouts',
                        ],
                        [
                            'KYC & Fraud Prevention',
                            'Verifying Artist identity to prevent impersonation, fake listings, and fraud',
                        ],
                        ['Travel Charge Calculation', 'GPS-based distance measurement to apply accurate travel charges'],
                        ['Customer Support', 'Investigating disputes, resolving complaints, responding to queries'],
                        ['Platform Improvement', 'Analyzing anonymized/aggregated usage patterns to improve features'],
                        [
                            'Legal Compliance',
                            'Meeting obligations under Indian law including tax and regulatory requirements',
                        ],
                        ['Notifications', 'Booking confirmations, OTPs, balance payment reminders, policy updates'],
                    ]}
                />
            </Section>

            {/* 4. KYC & Identity Verification */}
            <Section id="kyc" title="4. KYC & Identity Verification (Artists)">
                <SubHeading>4.1 Who Must Complete KYC</SubHeading>
                <ul className="list-disc pl-6 space-y-1">
                    <li>
                        KYC and Identity Verification are <strong>mandatory for all Artists</strong> before they may
                        accept bookings or receive payouts
                    </li>
                    <li>
                        KYC is <strong>not required for Customers</strong> at this time (Mimora reserves the right to
                        introduce Customer verification for specific services or transaction thresholds in the future)
                    </li>
                    <li>
                        Artists who do not complete verification will have accounts restricted to non-bookable status
                        until verification is complete
                    </li>
                </ul>

                <SubHeading>4.2 Verification Status Requirements</SubHeading>
                <p>
                    An Artist is <strong>Verified</strong> and eligible for bookings only when <strong>both</strong> of
                    the following are complete:
                </p>
                <LegalTable
                    headers={['Verification Component', 'Required Status']}
                    rows={[
                        ['KYC Status (PAN / Aadhaar)', <Yes>VERIFIED</Yes>],
                        ['Identity Status (Live Photo Match)', <Yes>VERIFIED</Yes>],
                    ]}
                />

                <SubHeading>4.3 Part 1 — KYC Document Verification</SubHeading>
                <p>Artists must verify identity using one of the following:</p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>
                        <strong>PAN Card</strong> — issued by the Income Tax Department of India
                    </li>
                    <li>
                        <strong>Aadhaar Card</strong> — issued by UIDAI
                    </li>
                </ul>
                <p>
                    <strong>Process:</strong>
                </p>
                <ol className="list-decimal pl-6 space-y-1">
                    <li>Artist selects document type on the Platform</li>
                    <li>
                        Artist is redirected to <strong>DigiLocker</strong> or an approved KYC partner
                    </li>
                    <li>Platform receives a verification status confirmation from the KYC provider</li>
                    <li>
                        Document data is processed and stored by the KYC partner —{' '}
                        <strong>Mimora does not store raw document copies on its own servers</strong>
                    </li>
                </ol>

                <SubHeading>4.4 Part 2 — Identity Verification (Live Photo Match)</SubHeading>
                <p>To prevent impersonation and account fraud:</p>
                <ol className="list-decimal pl-6 space-y-1">
                    <li>Artist uploads a clear, recent profile photograph</li>
                    <li>
                        Artist takes a <strong>real-time live photograph</strong> via the Platform app
                    </li>
                    <li>Facial recognition system compares the two</li>
                    <li>Result (Verified / Not Verified) is recorded on the Artist's account</li>
                </ol>
                <Callout tone="amber">
                    Using another person's photograph is a criminal offence and will result in immediate account
                    removal and referral to law enforcement.
                </Callout>

                <SubHeading>4.5 Re-Verification</SubHeading>
                <p>
                    Mimora reserves the right to require re-verification of any Artist at any time if there are
                    grounds to suspect identity fraud, account takeover, or material changes in circumstances. Failure
                    to complete re-verification within the notified period results in account suspension.
                </p>
            </Section>

            {/* 5. How Money Flows */}
            <Section id="money-flow" title="5. How Money Flows (Payment Architecture)">
                <SubHeading>Step 1 — Customer Pays at Booking Confirmation</SubHeading>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Amount = Service Price + Travel Charge + Secure Booking Fee</li>
                    <li>UPI preferred</li>
                    <li>
                        <strong>Cashfree collection fee: 1.6% MDR</strong> on gross amount
                    </li>
                </ul>

                <SubHeading>Step 2 — Money Held in Cashfree Escrow</SubHeading>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Full amount sits in Cashfree's nodal bank account</li>
                    <li>Neither Artist nor Mimora can access it during this period</li>
                    <li>Calendar slot blocked only after successful escrow confirmation</li>
                </ul>

                <SubHeading>Step 3 — Service Delivered → OTP Verification</SubHeading>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Customer receives OTP via SMS and/or app after service delivery</li>
                    <li>Customer shares OTP with Artist upon satisfaction</li>
                    <li>Artist enters OTP on Platform to confirm completion</li>
                </ul>

                <SubHeading>Step 4 — Cashfree Releases Payout to Artist</SubHeading>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Mimora calls the Cashfree Payout API</li>
                    <li>
                        Artist always receives their <strong>full service price</strong> — Mimora never deducts from
                        the Artist's stated price
                    </li>
                    <li>
                        <strong>Cashfree payout fee: Rs. 2–5 flat</strong> per transfer
                    </li>
                </ul>

                <SubHeading>Sample Booking Breakdown — Rs. 1,000 Service + 3 km Travel</SubHeading>
                <LegalTable
                    headers={['Line Item', 'Amount']}
                    rows={[
                        ["Artist's service price", 'Rs. 1,000.00'],
                        ['Travel charge (3 km — 1.5 km free + 1.5 × Rs. 10)', 'Rs. 15.00'],
                        ['Secure Booking Fee', 'Rs. 50.00'],
                        [<strong>Total customer pays</strong>, <strong>Rs. 1,065.00</strong>],
                        ['Cashfree collection fee (1.6%)', '– Rs. 17.04'],
                        ['Cashfree payout fee (flat)', '– Rs. 5.00'],
                        [<strong>Artist receives</strong>, <strong>Rs. 1,000.00</strong>],
                        [<strong>Platform earns</strong>, <strong>~Rs. 42.96</strong>],
                    ]}
                />
            </Section>

            {/* 6. Secure Booking Fee & Discount */}
            <Section id="secure-fee" title="6. Secure Booking Fee & Instant Discount">
                <SubHeading>Fee Tiers (Based on Artist Price)</SubHeading>
                <LegalTable
                    headers={['Artist Price Range', 'Secure Fee %']}
                    rows={[
                        ['Up to Rs. 500', '5%'],
                        ['Rs. 501 – Rs. 1,000', '4%'],
                        ['Rs. 1,001 – Rs. 2,000', '3.5%'],
                        ['Above Rs. 2,000', '3%'],
                    ]}
                />

                <SubHeading>Discount Logic</SubHeading>
                <p>After Cashfree takes its cut from the Secure Booking Fee, the remainder is split:</p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>
                        <strong>30% stays with Mimora</strong> (platform operations)
                    </li>
                    <li>
                        <strong>70% is instantly discounted off the Customer's bill</strong>
                    </li>
                </ul>
                <CodeBlock>
                    {`secure_fee        = artist_price × fee_pct
gross_charge      = artist_price + secure_fee + travel
cashfree_cut      = gross_charge × 1.6%           [internal]
payout_fee        = Rs. 5                          [internal]
remaining         = secure_fee − cashfree_cut − payout_fee
  → IF remaining ≤ 0: discount = 0, no savings line shown (bookings under ~Rs. 152)
you_keep          = remaining × 30%                [internal]
discount          = remaining × 70%                [shown to customer in green]
final_charge      = gross_charge − discount
artist_payout     = artist_price                   [always protected]`}
                </CodeBlock>

                <SubHeading>What Customer Sees at Checkout</SubHeading>
                <LegalTable
                    headers={['Line Item', 'Shown?']}
                    rows={[
                        ['Artist service price', <Yes>Yes</Yes>],
                        ['Travel charge', <Yes>Yes (removed if Rs. 0)</Yes>],
                        [
                            'Secure Booking Fee',
                            <Yes>Yes — label: "Secure Booking Fee — covers payment protection & booking guarantee"</Yes>,
                        ],
                        ['Secure Fee Savings', <Yes>Yes — in green (only if remaining &gt; 0)</Yes>],
                        ['Cashfree MDR (1.6%)', <No>No — internal</No>],
                        ['Cashfree payout fee', <No>No — internal</No>],
                        ['Platform ops share', <No>No — internal</No>],
                        [<strong>Total payable</strong>, <Yes><strong>Yes — bold</strong></Yes>],
                    ]}
                />
                <Callout>
                    Never label it "platform fee." Always use <strong>"Secure Booking Fee"</strong> with the sub-label{' '}
                    <em>"covers payment protection and booking guarantee."</em>
                </Callout>
            </Section>

            {/* 7. Travel Charge Policy */}
            <Section id="travel-charge" title="7. Travel Charge Policy">
                <p>
                    Travel charges apply only when the Artist travels to the Customer's location. Studio visits ={' '}
                    <strong>Rs. 0.</strong>
                </p>
                <LegalTable
                    headers={['Zone', 'Rate', 'Formula']}
                    rows={[
                        ['Free Zone (0 to 1.5 km)', 'Rs. 0', 'No charge'],
                        ['Chargeable Zone (beyond 1.5 km)', 'Rs. 10/km', '(distance − 1.5) × 10'],
                    ]}
                />
                <LegalTable
                    headers={['Distance', 'Charge']}
                    rows={[
                        ['1.0 km', 'Rs. 0 — FREE'],
                        ['1.5 km', 'Rs. 0 — FREE'],
                        ['3.0 km', 'Rs. 15.00'],
                        ['5.0 km', 'Rs. 35.00'],
                        ['10.0 km', 'Rs. 85.00'],
                    ]}
                />
                <p>
                    <strong>Rules:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Charges are locked before payment — no recalculation after booking confirmation</li>
                    <li>One travel charge per booking — not per person, not per package</li>
                    <li>Multi-package bookings: one travel charge on the combined total</li>
                </ul>
            </Section>

            {/* 8. Cancellation & Refund Policy */}
            <Section id="cancellation" title="8. Cancellation & Refund Policy">
                <SubHeading>Golden Rule (All Modules, Non-Negotiable)</SubHeading>
                <Callout>
                    <strong>
                        If an Artist cancels at any stage — even minutes before service — the Customer always receives
                        a 100% refund. The Artist receives zero payout.
                    </strong>
                </Callout>

                <SubHeading>8.1 Instant Module</SubHeading>
                <LegalTable
                    headers={['Scenario', 'Refund']}
                    rows={[
                        ['Artist cancels (any time)', <strong>100%</strong>],
                        ['Customer cancels &gt; 1 hour before', <strong>100%</strong>],
                        ['Customer cancels ≤ 1 hour before', <strong>NO REFUND</strong>],
                        ['OTP not verified by end of day (11:55 PM cron)', <strong>100%</strong>],
                        ['Artist no-show / service not delivered', <strong>100%</strong>],
                    ]}
                />

                <SubHeading>8.2 Scheduled Instant Module</SubHeading>
                <LegalTable
                    headers={['Scenario', 'Refund']}
                    rows={[
                        ['Artist cancels (any time)', <strong>100%</strong>],
                        ['Customer cancels &gt; 12 hours before', <strong>100%</strong>],
                        ['Customer cancels 2–12 hours before', <strong>50%</strong>],
                        ['Customer cancels ≤ 2 hours before', <strong>NO REFUND</strong>],
                        ['OTP not verified by end of day', <strong>100%</strong>],
                        ['Artist no-show / service not delivered', <strong>100%</strong>],
                    ]}
                />

                <SubHeading>8.3 Flexi Module (Event Bookings)</SubHeading>
                <p>
                    Designed for weddings, functions, shoots. Advance payments are non-refundable because the Artist
                    blocks the calendar slot irreversibly the moment booking is confirmed.
                </p>

                <p className="font-semibold text-[#1E1E1E]">Path 1 — Trial Session Only</p>
                <LegalTable
                    headers={['Scenario', 'Outcome']}
                    rows={[
                        ['Customer pays trial fee', 'Held in Cashfree escrow'],
                        ['After trial → satisfied', 'Trial fee adjusted against full booking'],
                        ['After trial → walks away', <strong>Trial fee NON-REFUNDABLE</strong>],
                        ['Customer cancels &gt; 48 hrs before trial', <strong>100% REFUND</strong>],
                        ['Customer cancels ≤ 48 hrs before trial', <strong>NO REFUND</strong>],
                        ['Artist cancels trial (any time)', <strong>100% REFUND</strong>],
                    ]}
                />

                <p className="font-semibold text-[#1E1E1E]">Path 2 — Direct Full Booking (No Trial)</p>
                <LegalTable
                    headers={['Scenario', 'Refund']}
                    rows={[
                        ['Customer cancels &gt; 7 days before event', <strong>100%</strong>],
                        ['Customer cancels 3–7 days before event', <strong>50%</strong>],
                        ['Customer cancels &lt; 3 days before event', <strong>NO REFUND</strong>],
                        ['Artist cancels (any time)', <strong>100%</strong>],
                        ['OTP not verified by end of day', <strong>100% (auto cron)</strong>],
                    ]}
                />

                <p className="font-semibold text-[#1E1E1E]">Path 3 — Advance Payment + Full Booking</p>
                <p>
                    Artist sets their own advance % (e.g., 20%, 30%, 40%) during onboarding. Customer pays advance to
                    lock slot, pays remaining balance before service date.
                </p>
                <p>
                    <strong>Payment Steps:</strong>
                </p>
                <LegalTable
                    headers={['Step', 'What Happens', 'Refundable?']}
                    rows={[
                        ['1 — Booking', 'Customer pays Artist-defined advance', <strong>NEVER — slot locked immediately</strong>],
                        ['2 — Reminder', 'Platform reminds Customer 48 hrs before to pay balance', '—'],
                        ['3 — Balance', 'Customer pays remaining amount', 'Depends on timing'],
                        ['4 — Delivery', 'Artist delivers service', '—'],
                        ['5 — OTP', 'OTP entered → full amount released to Artist', 'N/A'],
                    ]}
                />
                <p>
                    <strong>Path 3 Cancellation Rules:</strong>
                </p>
                <LegalTable
                    headers={['Scenario', 'Advance', 'Balance (if paid)']}
                    rows={[
                        ['Artist cancels any time', <strong>100% REFUND</strong>, <strong>100% REFUND</strong>],
                        ['Customer cancels — balance not yet paid', 'NON-REFUNDABLE', 'Not paid — N/A'],
                        ['Customer cancels &gt; 7 days before event', 'NON-REFUNDABLE', <strong>100% REFUND</strong>],
                        ['Customer cancels 3–7 days before event', 'NON-REFUNDABLE', <strong>50% REFUND</strong>],
                        ['Customer cancels &lt; 3 days before event', 'NON-REFUNDABLE', <strong>NO REFUND</strong>],
                        ['OTP not verified by end of service day', 'NON-REFUNDABLE', <strong>100% REFUND</strong>],
                    ]}
                />
                <Callout>
                    <strong>Why advances are non-refundable:</strong> The Artist immediately blocks that calendar date
                    and declines all other enquiries — creating an irrecoverable opportunity cost. Customers are shown
                    the non-refundable advance terms clearly and must explicitly accept them before paying. If the
                    Artist cancels after receiving the advance, both the advance and any balance paid are returned to
                    the Customer as a financial penalty.
                </Callout>

                <SubHeading>8.4 Refund Processing</SubHeading>
                <ul className="list-disc pl-6 space-y-1">
                    <li>All refunds are processed via Cashfree to the Customer's <strong>original payment method</strong></li>
                    <li>UPI: typically <strong>1–2 business days</strong></li>
                    <li>Bank account / card: <strong>5–7 business days</strong></li>
                    <li>The Secure Booking Fee and Travel Charge are included in full refunds</li>
                    <li>Cashfree's payment reversal fees are borne by Mimora — not charged to the Customer</li>
                </ul>
            </Section>

            {/* 9. Edge Cases */}
            <Section id="edge-cases" title="9. Edge Cases & Special Scenarios">
                <LegalTable
                    headers={['Scenario', 'Policy', 'System Action']}
                    rows={[
                        [
                            <strong>OTP Not Verified by End of Day</strong>,
                            ' 100% auto-refund to Customer. Artist receives Rs. 0. Booking marked Unverified-Refunded.',
                            'Cron at 11:55 PM → triggers Cashfree Refund API for all IN_SERVICE bookings with OTP unverified',
                        ],
                        [
                            <strong>Saree Pleating / No Calendar Block</strong>,
                            'Payment, escrow, OTP, refund logic identical. Backend only skips the calendar block step.',
                            'Backend flag suppresses calendar block; Cashfree flow unchanged',
                        ],
                        [
                            <strong>Multi-Package Booking</strong>,
                            'All packages = one Cashfree order. One travel charge + one Secure Booking Fee on the combined total.',
                            'Single order ID. One payment, one escrow, one refund if needed',
                        ],
                        [
                            <strong>Studio Visit</strong>,
                            'Travel charge = Rs. 0. All other logic (escrow, OTP, refund, payout) identical.',
                            'Travel charge line item = zero; removed from checkout display',
                        ],
                        [
                            <strong>Flexi — Artist Cancels After Advance</strong>,
                            'Both advance and any balance paid are fully refunded. Artist receives Rs. 0.',
                            'Full reversal of all escrowed amounts via Cashfree Refund API',
                        ],
                        [
                            <strong>Dispute Before OTP</strong>,
                            'Escrow frozen immediately. Booking flagged as DISPUTED. Manual review via Cashfree dashboard. Funds released or refunded only after investigation.',
                            'Cashfree escrow freeze. Booking status → DISPUTED. Manual review workflow triggered',
                        ],
                    ]}
                />
            </Section>

            {/* 10. Terms for Customers */}
            <Section id="customer-terms" title="10. Terms for Customers">
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
            <Section id="artist-terms" title="11. Terms for Artists">
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

            {/* 12. Data Storage & Security */}
            <Section id="data-security" title="12. Data Storage & Security">
                <LegalTable
                    headers={['Measure', 'Detail']}
                    rows={[
                        ['Encryption in transit', 'All data uses TLS/HTTPS'],
                        ['Encryption at rest', "Sensitive data fields encrypted in Mimora's database"],
                        ['Password hashing', 'bcrypt — never stored in plaintext'],
                        ['Access control', 'Internal access limited to authorized personnel on need-to-know basis'],
                        ['Audit logging', 'All access to sensitive records is logged'],
                        ['Payment security', 'Cashfree is PCI-DSS compliant — full card data never touches Mimora servers'],
                        ['KYC data', "Stored only by the KYC partner (DigiLocker) — not on Mimora's infrastructure"],
                    ]}
                />
            </Section>

            {/* 13. Data Sharing */}
            <Section id="data-sharing" title="13. Data Sharing">
                <LegalTable
                    headers={['Party', 'What is Shared', 'Why']}
                    rows={[
                        ['Cashfree Payments', 'Booking amount, order details, Artist bank/UPI details', 'Payment collection and payout'],
                        ['KYC Partner / DigiLocker', 'Document type and verification request', 'Artist KYC verification'],
                        ['Facial Recognition Provider', 'Profile photo + live capture', 'Artist identity verification'],
                        ['SMS / Notification Provider', 'Mobile number', 'OTP and booking notifications'],
                        ['Analytics Provider', 'Anonymized usage data', 'Platform improvement (no PII)'],
                    ]}
                />
                <p>
                    <strong>We do not:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Sell personal data to advertisers or marketers</li>
                    <li>Share Customer data with Artists beyond what is operationally necessary for the booked service</li>
                    <li>Share Artist KYC data with Customers or other Artists</li>
                    <li>Use personal data for targeted advertising</li>
                </ul>
                <p>
                    <strong>Legal disclosures:</strong> Mimora may disclose data if required by valid court order,
                    government directive, or regulatory mandate. Users will be notified where legally permitted.
                </p>
            </Section>

            {/* 14. Location Data */}
            <Section id="location-data" title="14. Location Data">
                <ul className="list-disc pl-6 space-y-1">
                    <li>Used exclusively for: (a) travel charge calculation, and (b) matching Customers with nearby Artists</li>
                    <li>Collected only during active app use (no background collection unless explicitly permitted by user)</li>
                    <li>Not shared with third parties beyond operational necessity</li>
                    <li>
                        Users may disable location permissions via device settings (may affect travel charge
                        calculation and Artist matching)
                    </li>
                </ul>
            </Section>

            {/* 15. User Rights */}
            <Section id="user-rights" title="15. User Rights">
                <LegalTable
                    headers={['Right', 'Description', 'How to Exercise']}
                    rows={[
                        ['Access', 'Request a copy of personal data Mimora holds about you', 'Email privacy@mimora.in'],
                        ['Correction', 'Request correction of inaccurate or incomplete data', 'Update in-app or email privacy@mimora.in'],
                        ['Deletion', 'Request deletion of personal data (subject to legal retention obligations)', 'Email privacy@mimora.in'],
                        ['Portability', 'Request data in a structured, machine-readable format', 'Email privacy@mimora.in'],
                        ['Withdrawal of Consent', 'Withdraw consent to data processing (may affect Platform access)', 'Email privacy@mimora.in'],
                        ['Grievance Redressal', 'Raise a complaint about data processing', 'Contact Grievance Officer below'],
                    ]}
                />
                <p>
                    Mimora will respond to all verified data rights requests within <strong>30 days.</strong>
                </p>
            </Section>

            {/* 16. Data Retention */}
            <Section id="data-retention" title="16. Data Retention">
                <LegalTable
                    headers={['Data Type', 'Retention Period']}
                    rows={[
                        ['Active account data', 'Duration of account activity'],
                        ['Booking and transaction records', '7 years (Indian financial regulations)'],
                        ['KYC verification records', "Duration of Artist's active relationship + legally mandated period"],
                        ['Support and dispute records', '2 years from case closure'],
                        ['Anonymized analytics data', 'Indefinite (no PII retained)'],
                        ['Deleted account data', 'Purged within 90 days (subject to legal obligations)'],
                    ]}
                />
            </Section>

            {/* 17. Children's Privacy */}
            <Section id="childrens-privacy" title="17. Children's Privacy">
                <p>
                    The Mimora platform is <strong>not intended for individuals under 18 years of age.</strong> Mimora
                    does not knowingly collect personal data from minors. If you believe a minor has provided personal
                    information without parental consent, contact{' '}
                    <a href="mailto:privacy@mimora.in" className="text-[#E84A7F] hover:underline">
                        privacy@mimora.in
                    </a>{' '}
                    and Mimora will delete such information.
                </p>
            </Section>

            {/* 18. Dispute Resolution */}
            <Section id="dispute-resolution" title="18. Dispute Resolution">
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

            {/* 19. Grievance Officer */}
            <Section id="grievance-officer" title="19. Grievance Officer">
                <p>
                    As required by the Information Technology (Intermediary Guidelines and Digital Media Ethics Code)
                    Rules, 2021:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>
                        <strong>Name:</strong> [Grievance Officer Name]
                    </li>
                    <li>
                        <strong>Email:</strong>{' '}
                        <a href="mailto:privacy@mimora.in" className="text-[#E84A7F] hover:underline">
                            privacy@mimora.in
                        </a>
                    </li>
                    <li>
                        <strong>Address:</strong> [Mimora's Registered Address]
                    </li>
                    <li>
                        <strong>Response:</strong> Within 48 hours of receipt; resolution within 30 days
                    </li>
                </ul>
            </Section>

            {/* 20. Changes to This Policy */}
            <Section id="changes" title="20. Changes to This Policy">
                <p>
                    Mimora reserves the right to update this Policy at any time. Significant changes will be
                    communicated via registered email or in-app notification. Continued use of the Platform after
                    changes constitutes acceptance.
                </p>
            </Section>

            {/* Agreement */}
            <Section id="agreement" title="Agreement">
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

export default PrivacyPolicy;
