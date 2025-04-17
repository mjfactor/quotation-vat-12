import type { Route } from "./+types/vat-calcu";
import { useState } from 'react';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Vat" },
        { name: "description", content: "Vat Calcu" },
    ];
}

const VatCalculator = () => {
    const [amount, setAmount] = useState<string>('');

    const VAT_RATE = 0.12; // 12% VAT

    // Function to format number with commas
    const formatNumber = (num: number): string => {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    // Calculate VAT and total
    const calculateVat = (inputAmount: string) => {
        const numAmount = parseFloat(inputAmount.replace(/,/g, ''));

        if (isNaN(numAmount)) return {
            inputAmount: '0.00',
            vatAmount: '0.00',
            totalAmount: '0.00'
        };

        const vatAmount = numAmount * VAT_RATE;
        const totalAmount = numAmount + vatAmount;

        return {
            inputAmount: formatNumber(numAmount),
            vatAmount: formatNumber(vatAmount),
            totalAmount: formatNumber(totalAmount)
        };
    };

    const results = calculateVat(amount);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-gray-900">
                <h1 className="text-2xl font-bold text-center mb-6">VAT Calculator (12%)</h1>

                <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700 mb-2">Enter Amount</label>
                    <input
                        id="amount"
                        type="text"
                        value={amount}
                        onChange={(e) => {
                            // Remove non-numeric characters except decimal point
                            const value = e.target.value.replace(/[^0-9.]/g, '');
                            setAmount(value);
                        }}
                        placeholder="Enter amount"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                    <div className="flex justify-between">
                        <span>Input Amount:</span>
                        <span className="font-semibold">₱ {results.inputAmount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>VAT (12%):</span>
                        <span className="font-semibold">₱ {results.vatAmount}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                        <span className="font-bold">Total Amount:</span>
                        <span className="font-bold">₱ {results.totalAmount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VatCalculator;