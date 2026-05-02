// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthLayout title="Lupa Password" description="Masukkan email Anda untuk menerima link reset password">
            <Head title="Lupa Password" />

            <div className="space-y-6">
                {status && (
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center text-sm font-medium text-emerald-700">
                        {status}
                    </div>
                )}

                <p className="text-sm text-gray-600">
                    Jangan khawatir! Kami akan mengirimkan link untuk mereset password ke email Anda.
                </p>

                <form onSubmit={submit}>
                    <div className="grid gap-2 mb-6">
                        <Label htmlFor="email" className="text-gray-700 font-medium">
                            Email
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={data.email}
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="nama@example.com"
                                className="pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                        </div>

                        <InputError message={errors.email} />
                    </div>

                    <Button
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 h-auto rounded-lg transition-colors"
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Mengirim...
                            </>
                        ) : (
                            'Kirim Link Reset'
                        )}
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">Atau</span>
                    </div>
                </div>

                <div className="text-center">
                    <TextLink
                        href={route('admin.login')}
                        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Login Admin
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
