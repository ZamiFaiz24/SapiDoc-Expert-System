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
        <AuthLayout title="Masuk ke Akun Anda" description="Masukkan email dan password untuk mengakses sistem SapiDoc">
            <Head title="Masuk" />

            <form className="flex flex-col gap-7" onSubmit={submit}>
                {status && (
                    <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-800 backdrop-blur-sm">
                        {status}
                    </div>
                )}

                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium">
                            Email
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
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
                                className="pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                        </div>
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-gray-700 font-medium">
                                Password
                            </Label>
                            {canResetPassword && (
                                <TextLink
                                    href={route('password.request')}
                                    className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                                    tabIndex={5}
                                >
                                    Lupa password?
                                </TextLink>
                            )}
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
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
                                className="pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            tabIndex={3}
                            checked={data.remember}
                            onCheckedChange={(checked: any) => setData('remember', checked as boolean)}
                            disabled={processing}
                            className="border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <Label htmlFor="remember" className="text-gray-700 cursor-pointer">
                            Ingat saya
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 h-auto rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            'Masuk'
                        )}
                    </Button>
                </div>

                <div className="relative pt-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-3 text-gray-500 font-medium">Atau</span>
                    </div>
                </div>

                <div className="text-center text-sm space-y-2">
                    <p className="text-gray-600">
                        Akses ini khusus untuk admin.
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
}
