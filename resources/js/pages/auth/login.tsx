import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
    [key: string]: any;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.login.store'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Masuk ke Akun Anda" description="Masukkan email dan password untuk mengakses dashboard admin SapiDoc">
            <Head title="Masuk" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                {status && (
                    <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-800">
                        {status}
                    </div>
                )}

                <div className="grid gap-5">
                    <div className="grid gap-2.5">
                        <Label htmlFor="email" className="text-gray-800 font-semibold text-sm">
                            Email Address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="nama@example.com"
                                className="pl-11 py-2.5 text-gray-800 text-sm border-gray-300 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 focus:ring-1 rounded-lg transition-colors"
                            />
                        </div>
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2.5">
                        <Label
                            htmlFor="password"
                            className="text-gray-800 font-semibold text-sm"
                        >
                            Password
                        </Label>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />

                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Masukkan password Anda"
                                className="pl-11 py-2.5 text-gray-800 text-sm border-gray-300 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 focus:ring-1 rounded-lg transition-colors"
                            />
                        </div>

                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <Checkbox
                            id="remember"
                            name="remember"
                            tabIndex={3}
                            checked={data.remember}
                            onCheckedChange={(checked: any) => setData('remember', checked as boolean)}
                            disabled={processing}
                            className="border-gray-300 text-emerald-600 focus:ring-emerald-500 rounded"
                        />
                        <Label htmlFor="remember" className="text-gray-700 cursor-pointer text-sm font-medium">
                            Ingat saya di perangkat ini
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 h-auto rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            'Masuk ke Dashboard'
                        )}
                    </Button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-xs font-semibold text-gray-500">
                            Keamanan Sistem
                        </span>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <p className="text-sm font-medium text-gray-800 text-center">
                        Halaman dapat diakses oleh Admini SapiDoc.
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500 text-center">
                        Gunakan email dan password yang telah terdaftar.
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
}
