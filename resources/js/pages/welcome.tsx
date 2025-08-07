import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState<number | null>(null);
    const [operation, setOperation] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputDigit = (digit: string) => {
        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? digit : display + digit);
        }
    };

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    };

    const clear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
    };

    const performOperation = (nextOperation: string) => {
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operation) {
            const currentValue = previousValue || 0;
            const newValue = calculate(currentValue, inputValue, operation);

            setDisplay(String(newValue));
            setPreviousValue(newValue);
        }

        setWaitingForOperand(true);
        setOperation(nextOperation);
    };

    const calculate = (firstValue: number, secondValue: number, operation: string): number => {
        switch (operation) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '×':
                return firstValue * secondValue;
            case '÷':
                return firstValue / secondValue;
            case '=':
                return secondValue;
            default:
                return secondValue;
        }
    };

    const percentage = () => {
        const value = parseFloat(display) / 100;
        setDisplay(String(value));
    };

    const toggleSign = () => {
        const value = parseFloat(display);
        setDisplay(String(value * -1));
    };

    return (
        <>
            <Head title="Calculator">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[400px] flex-col">
                        {/* Calculator Header */}
                        <div className="mb-8 text-center">
                            <h1 className="mb-2 text-3xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">
                                🧮 Calculator
                            </h1>
                            <p className="text-[#706f6c] dark:text-[#A1A09A]">
                                Simple arithmetic with style
                            </p>
                        </div>

                        {/* Calculator */}
                        <div className="mx-auto w-full max-w-sm rounded-lg bg-white p-6 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            {/* Display */}
                            <div className="mb-4 rounded-md border border-[#19140035] bg-[#FDFDFC] p-4 text-right dark:border-[#3E3E3A] dark:bg-[#0a0a0a]">
                                <div className="text-2xl font-mono font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                                    {display}
                                </div>
                            </div>

                            {/* Button Grid */}
                            <div className="grid grid-cols-4 gap-2">
                                {/* Row 1 */}
                                <button
                                    onClick={clear}
                                    className="col-span-2 rounded-md border border-[#19140035] bg-[#f8f8f7] px-4 py-3 font-semibold text-[#1b1b18] hover:bg-[#f0f0ef] active:bg-[#e8e8e7] dark:border-[#3E3E3A] dark:bg-[#2a2a28] dark:text-[#EDEDEC] dark:hover:bg-[#323230] dark:active:bg-[#3a3a38]"
                                >
                                    AC
                                </button>
                                <button
                                    onClick={toggleSign}
                                    className="rounded-md border border-[#19140035] bg-[#f8f8f7] px-4 py-3 font-semibold text-[#1b1b18] hover:bg-[#f0f0ef] active:bg-[#e8e8e7] dark:border-[#3E3E3A] dark:bg-[#2a2a28] dark:text-[#EDEDEC] dark:hover:bg-[#323230] dark:active:bg-[#3a3a38]"
                                >
                                    ±
                                </button>
                                <button
                                    onClick={percentage}
                                    className="rounded-md border border-[#19140035] bg-[#f8f8f7] px-4 py-3 font-semibold text-[#1b1b18] hover:bg-[#f0f0ef] active:bg-[#e8e8e7] dark:border-[#3E3E3A] dark:bg-[#2a2a28] dark:text-[#EDEDEC] dark:hover:bg-[#323230] dark:active:bg-[#3a3a38]"
                                >
                                    %
                                </button>

                                {/* Row 2 */}
                                <button
                                    onClick={() => inputDigit('7')}
                                    className="rounded-md border border-[#19140035] bg-white px-4 py-3 font-semibold text-[#1b1b18] hover:bg-[#f8f8f7] active:bg-[#f0f0ef] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#2a2a28] dark:active:bg-[#323230]"
                                >
                                    7
                                </button>
                                <button
                                    onClick={() => inputDigit('8')}
                                    className="rounded-md border border-[#19140035] bg-white px-4 py-3 font-semibold text-[#1b1b18] hover:bg-[#f8f8f7] active:bg-[#f0f0ef] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#2a2a28] dark:active:bg-[#323230]"
                                >
                                    8
                                </button>
                                <button
                                    onClick={() => inputDigit('9')}
                                    className="rounded-md border border-[#19140035] bg-white px-4 py-3 font-semibold text-[#1b1b18] hover:bg-[#f8f8f7] active:bg-[#f0f0ef] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#2a2a28] dark:active:bg-[#323230]"
                                >
                                    9
                                </button>
                                <button
                                    onClick={() => performOperation('÷')}
                                    className="rounded-md border border-[#1b1b18] bg-[#1b1b18] px-4 py-3 font-semibold text-white hover:bg-[#2a2a27] active:bg-[#323230] dark:border-[#EDEDEC] dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-[#d4d4d2] dark:active:bg-[#c4c4c2]"
                                >
                                    ÷
                                </button>

                                {/* Row 3 */}
                                <button
                                    onClick={() => inputDigit('4')}
                                    className="rounded-md border border-[#19140035] bg-white px-4 py-3 font-semibold text-[#1b1b18] hover:bg-[#f8f8f7] active:bg-[#f0f0ef] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#2a2a28] dark:active:bg-[#323230]"
                                >
                                    4
                                </button>
                                <button
                                    onClick={() => inputDigit('5')}
                                    className="rounded-md border border-[#19140035] bg-white px-4 py-3 font-semibold text-[#1b1b18] hover:bg-[#f8f8f7] active:bg-[#f0f0ef] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#2a2a28] dark:active:bg-[#323230]"
                                >
                                    5
                                </button>
                                <button
                                    onClick={() => inputDigit('6')}
                                    className="rounded-md border border-[#19140035] bg-white px-4 py-3 font-semibold text-[#1b1b18] hover:bg-[#f8f8f7] active:bg-[#f0f0ef] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#2a2a28] dark:active:bg-[#323230]"
                                >
                                    6
                                </button>
                                <button
                                    onClick={() => performOperation('×')}
                                    className="rounded-md border border-[#1b1b18] bg-[#1b1b18] px-4 py-3 font-semibold text-white hover:bg-[#2a2a27] active:bg-[#323230] dark:border-[#EDEDEC] dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-[#d4d4d2] dark:active:bg-[#c4c4c2]"
                                >
                                    ×
                                </button>

                                {/* Row 4 */}
                                <button
                                    onClick={() => inputDigit('1')}
                                    className="rounded-md border border-[#19140035] bg-white px-4 py-3 font-semibold text-[#1b1b18] hover:bg-[#f8f8f7] active:bg-[#f0f0ef] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#2a2a28] dark:active:bg-[#323230]"
                                >
                                    1
                                </button>
                                <button
                                    onClick={() => inputDigit('2')}
                                    className="rounded-md border border-[#19140035] bg-white px-4 py-3 font-semibold text-[#1b1b18] hover:bg-[#f8f8f7] active:bg-[#f0f0ef] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#2a2a28] dark:active:bg-[#323230]"
                                >
                                    2
                                </button>
                                <button
                                    onClick={() => inputDigit('3')}
                                    className="rounded-md border border-[#19140035] bg-white px-4 py-3 font-semibold text-[#1b1b18] hover:bg-[#f8f8f7] active:bg-[#f0f0ef] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#2a2a28] dark:active:bg-[#323230]"
                                >
                                    3
                                </button>
                                <button
                                    onClick={() => performOperation('-')}
                                    className="rounded-md border border-[#1b1b18] bg-[#1b1b18] px-4 py-3 font-semibold text-white hover:bg-[#2a2a27] active:bg-[#323230] dark:border-[#EDEDEC] dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-[#d4d4d2] dark:active:bg-[#c4c4c2]"
                                >
                                    −
                                </button>

                                {/* Row 5 */}
                                <button
                                    onClick={() => inputDigit('0')}
                                    className="col-span-2 rounded-md border border-[#19140035] bg-white px-4 py-3 font-semibold text-[#1b1b18] hover:bg-[#f8f8f7] active:bg-[#f0f0ef] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#2a2a28] dark:active:bg-[#323230]"
                                >
                                    0
                                </button>
                                <button
                                    onClick={inputDecimal}
                                    className="rounded-md border border-[#19140035] bg-white px-4 py-3 font-semibold text-[#1b1b18] hover:bg-[#f8f8f7] active:bg-[#f0f0ef] dark:border-[#3E3E3A] dark:bg-[#161615] dark:text-[#EDEDEC] dark:hover:bg-[#2a2a28] dark:active:bg-[#323230]"
                                >
                                    .
                                </button>
                                <button
                                    onClick={() => performOperation('+')}
                                    className="rounded-md border border-[#1b1b18] bg-[#1b1b18] px-4 py-3 font-semibold text-white hover:bg-[#2a2a27] active:bg-[#323230] dark:border-[#EDEDEC] dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-[#d4d4d2] dark:active:bg-[#c4c4c2]"
                                >
                                    +
                                </button>

                                {/* Equals button */}
                                <button
                                    onClick={() => performOperation('=')}
                                    className="col-span-4 mt-2 rounded-md border border-[#1b1b18] bg-[#1b1b18] px-4 py-3 font-semibold text-white hover:bg-[#2a2a27] active:bg-[#323230] dark:border-[#EDEDEC] dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-[#d4d4d2] dark:active:bg-[#c4c4c2]"
                                >
                                    =
                                </button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="mt-8 text-center">
                            <h2 className="mb-4 text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                                ✨ Features
                            </h2>
                            <div className="space-y-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                <p>• Basic arithmetic operations (+, −, ×, ÷)</p>
                                <p>• Decimal number support</p>
                                <p>• Percentage calculations</p>
                                <p>• Sign toggle (±)</p>
                                <p>• Clear all (AC) function</p>
                            </div>
                        </div>

                        {!auth.user && (
                            <div className="mt-8 text-center">
                                <p className="mb-4 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                    Create an account to access more features
                                </p>
                                <div className="flex justify-center gap-3">
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-md border border-[#1b1b18] bg-[#1b1b18] px-6 py-2 text-sm font-semibold text-white hover:bg-[#2a2a27] dark:border-[#EDEDEC] dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-[#d4d4d2]"
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-md border border-[#19140035] px-6 py-2 text-sm font-semibold text-[#1b1b18] hover:bg-[#f8f8f7] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:bg-[#2a2a28]"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
                
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}