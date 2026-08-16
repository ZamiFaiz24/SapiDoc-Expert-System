import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-svh bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex flex-col items-center justify-center gap-8 p-6 md:p-10">
            <div className="w-full max-w-md">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col items-center gap-6">
                        <Link href={route('home')} className="flex flex-col items-center gap-4 font-medium group">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 hover:from-emerald-200 hover:to-emerald-100 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105">
                                <img
                                    src="/images/logo.png"
                                    alt="SapiDoc Logo"
                                    className="h-12 w-12 object-contain"
                                />
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-emerald-700 font-bold text-xl">SapiDoc</span>
                                <span className="text-xs text-emerald-600 font-medium">Dashboard Administrator</span>
                            </div>
                        </Link>

                        <div className="space-y-3 text-center">
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
                            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{description}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md border border-emerald-100/50 p-8 backdrop-blur-sm">
                        {children}
                    </div>
                </div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-6">
                <p>© 2026 SapiDoc • Sistem Ahli Diagnosa Penyakit Ternak</p>
            </div>
        </div>
    );
}
