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
    { id: 'money-flow', label: '1. How Money Flows' },
    { id: 'secure-fee', label: '2. Secure Booking Fee & Discount' },
    { id: 'travel-charge', label: '3. Travel Charge Policy' },
    { id: 'cancellation', label: '4. Cancellation & Refund Policy' },
    { id: 'edge-cases', label: '5. Edge Cases & Special Scenarios' },
];

function RefundPolicy() {
    return (
        <LegalLayout
            title="Refund & Payment Policy"
            lastUpdated="2025 (Version 1.0)"
            sections={sections}
            intro={
                <>
                    <p>
                        This policy explains how payments flow through Mimora's escrow system, how fees and travel
                        charges are calculated, and the cancellation &amp; refund rules across every booking module.
                    </p>
                    <p className="mt-1">
                        <strong>Contact:</strong>{' '}
                        <a href="mailto:support@mimora.in" className="text-[#E84A7F] hover:underline">
                            support@mimora.in
                        </a>
                    </p>
                </>
            }
        >
            {/* 5. How Money Flows */}
            <Section id="money-flow" title="1. How Money Flows (Payment Architecture)">
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
            <Section id="secure-fee" title="2. Secure Booking Fee & Instant Discount">
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
            <Section id="travel-charge" title="3. Travel Charge Policy">
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
            <Section id="cancellation" title="4. Cancellation & Refund Policy">
                <SubHeading>Golden Rule (All Modules, Non-Negotiable)</SubHeading>
                <Callout>
                    <strong>
                        If an Artist cancels at any stage — even minutes before service — the Customer always receives
                        a 100% refund. The Artist receives zero payout.
                    </strong>
                </Callout>

                <SubHeading>4.1 Instant Module</SubHeading>
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

                <SubHeading>4.2 Scheduled Instant Module</SubHeading>
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

                <SubHeading>4.3 Flexi Module (Event Bookings)</SubHeading>
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

                <SubHeading>4.4 Refund Processing</SubHeading>
                <ul className="list-disc pl-6 space-y-1">
                    <li>All refunds are processed via Cashfree to the Customer's <strong>original payment method</strong></li>
                    <li>UPI: typically <strong>1–2 business days</strong></li>
                    <li>Bank account / card: <strong>5–7 business days</strong></li>
                    <li>The Secure Booking Fee and Travel Charge are included in full refunds</li>
                    <li>Cashfree's payment reversal fees are borne by Mimora — not charged to the Customer</li>
                </ul>
            </Section>

            {/* 9. Edge Cases */}
            <Section id="edge-cases" title="5. Edge Cases & Special Scenarios">
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
        </LegalLayout>
    );
}

export default RefundPolicy;
