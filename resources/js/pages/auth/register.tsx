import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, User, Mail, Lock } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    [key: string]: any;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Buat Akun Baru" description="Daftarkan akun Anda untuk menggunakan Sistem SapiDoc">
            <Head title="Daftar" />
            <form className="flex flex-col gap-7" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium">
                            Nama Lengkap
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Masukkan nama lengkap Anda"
                                className="pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                        </div>
                        <InputError message={errors.name} className="mt-1" />
                    </div>

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
                                tabIndex={2}
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
                        <Label htmlFor="password" className="text-gray-700 font-medium">
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={data.password}
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
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Ulangi password Anda"
                                className="pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                        </div>
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button
                        type="submit"
                        className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 h-auto rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        tabIndex={5}
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Mendaftar...
                            </>
                        ) : (
                            'Buat Akun'
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
                        Sudah memiliki akun?
                    </p>
                    <TextLink
                        href={route('login')}
                        className="inline-block font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                        tabIndex={6}
                    >
                        Masuk di sini
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
