// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Lock, Info } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title="Konfirmasi Password"
            description="Ini adalah area aman. Silakan konfirmasi password Anda untuk melanjutkan."
        >
            <Head title="Konfirmasi Password" />

            <form onSubmit={submit}>
                <div className="space-y-6">
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 flex gap-3">
                        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-700">
                            Untuk melindungi akun Anda, silakan masukkan ulang password Anda untuk melanjutkan.
                        </p>
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
                                name="password"
                                placeholder="Masukkan password Anda"
                                autoComplete="current-password"
                                value={data.password}
                                autoFocus
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                className="pl-10 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                        </div>

                        <InputError message={errors.password} />
                    </div>

                    <Button
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 h-auto rounded-lg transition-colors"
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            'Konfirmasi Password'
                        )}
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
