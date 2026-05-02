import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Lock, Mail } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

interface ResetPasswordForm {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<ResetPasswordForm>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Reset Password" description="Masukkan password baru Anda di bawah ini">
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <div className="grid gap-5">
                    <div className="grid gap-2">
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
                                disabled
                                readOnly
                                onChange={(e) => setData('email', e.target.value)}
                                className="pl-10 bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed"
                            />
                        </div>
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-gray-700 font-medium">
                            Password Baru
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                value={data.password}
                                autoFocus
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Minimal 8 karakter"
                                className="pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation" className="text-gray-700 font-medium">
                            Konfirmasi Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Ulangi password Anda"
                                className="pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                        </div>
                        <InputError message={errors.password_confirmation} className="mt-1" />
                    </div>

                    <Button
                        type="submit"
                        className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 h-auto rounded-lg transition-colors"
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            'Reset Password'
                        )}
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
