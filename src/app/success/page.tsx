"use client";
import { API_BASE } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const SuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const payment_intent = searchParams.get("payment_intent");

    useEffect(() => {
        const makeRequest = async () => {
            if (!payment_intent) {
                console.error("Payment intent not found.");
                return;
            }

            try {
                await fetch(`${API_BASE}/api/confirm/${payment_intent}`, {
                    method: "PUT",
                });
                setTimeout(() => {
                    router.push("/orders");
                }, 5000);
            } catch (err) {
                console.error("Error confirming payment:", err);
                // Показать пользователю сообщение об ошибке или предпринять другие действия
            }
        };

        makeRequest();
    }, [payment_intent, router]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <>
                <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
                    <p className="max-w-[600px]">
                        Payment successful. You are being redirected to the
                        orders page. Please do not close the page.
                    </p>
                    <ConfettiExplosion className="absolute m-auto" />
                </div>
            </>
        </Suspense>
    );
};

export default SuccessPage;
