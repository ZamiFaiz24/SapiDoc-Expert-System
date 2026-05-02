// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout title="Verifikasi Email" description="Silakan verifikasi alamat email Anda dengan mengklik tautan yang kami kirimkan.">
            <Head title="Verifikasi Email" />

            <div className="space-y-6">
                {status === 'verification-link-sent' && (
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-emerald-900">
                                Tautan verifikasi telah dikirim!
                            </p>
                            <p className="text-sm text-emerald-700 mt-1">
                                Kami telah mengirimkan tautan verifikasi ke email Anda. Silakan cek email Anda dan klik tautan untuk melanjutkan.
                            </p>
                        </div>
                    </div>
                )}

                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 flex gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-amber-900">
                            Belum menerima email?
                        </p>
                        <p className="text-sm text-amber-700 mt-1">
                            Jika Anda tidak menerima email verifikasi, klik tombol di bawah untuk mengirim ulang.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <Button
                        disabled={processing}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 h-auto rounded-lg transition-colors"
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Mengirim...
                            </>
                        ) : (
                            'Kirim Ulang Email Verifikasi'
                        )}
                    </Button>

                    <TextLink
                        href={route('logout')}
                        method="post"
                        className="mx-auto block text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                        Keluar
                    </TextLink>
                </form>
            </div>
        </AuthLayout>
    );
}
