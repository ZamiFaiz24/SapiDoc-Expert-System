import { useEffect } from "react";

interface Props {
    diagnosis: any;
    penyakit: any;
    gejala_dipilih: any[];
    diagnosis_banding: any[];
    interpretasi: string;
}

export default function Print({
    diagnosis,
    penyakit,
    gejala_dipilih,
    diagnosis_banding,
    interpretasi,
}: Props) {

    useEffect(() => {
        window.print();

        window.onafterprint = () => {
            window.close();
        };
    }, []);

    return (
        <div className="max-w-4xl mx-auto bg-white p-10 text-black">
            <div className="text-center border-b pb-4">
                <h1 className="text-3xl font-bold">
                    HASIL DIAGNOSIS PENYAKIT SAPI
                </h1>
                <p className="mt-2 text-gray-600">
                    Sistem Pakar SapiDoc
                </p>
                <p className="text-sm text-gray-500">
                    Metode Forward Chaining & Certainty Factor
                </p>
                <div className="mt-3 text-sm">
                    <p>
                    ID Diagnosis :
                    DX-{String(diagnosis.id).padStart(5,'0')}
                    </p>
                    <p>
                    Tanggal Cetak :
                    {new Date().toLocaleString('id-ID')}
                    </p>
                </div>
            </div>

            {/* IDENTITAS */}
            <div className="mt-8">
                <h2 className="font-bold text-lg border-b pb-2">
                    A. Informasi Peternak
                </h2>
                <table className="w-full mt-3 text-sm">
                    <tbody>
                        <tr>
                            <td className="w-44 font-semibold">Nama</td>
                            <td>{diagnosis.nama_user}</td>
                        </tr>

                        <tr>
                            <td className="font-semibold">Nomor HP</td>
                            <td>{diagnosis.no_hp_user}</td>
                        </tr>

                        <tr>
                            <td className="font-semibold">Alamat</td>
                            <td>{diagnosis.alamat_user}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* TERNAK */}
            <div className="mt-8">
                <h2 className="font-bold text-lg border-b pb-2">
                    B. Informasi Ternak
                </h2>

                <table className="w-full mt-3 text-sm">
                    <tbody>
                        <tr>
                            <td className="w-44 font-semibold">
                                Jenis Sapi
                            </td>
                            <td>{diagnosis.jenis_sapi}</td>
                        </tr>

                        <tr>
                            <td className="font-semibold">
                                Jenis Kelamin
                            </td>
                            <td>{diagnosis.jenis_kelamin}</td>
                        </tr>

                        <tr>
                            <td className="font-semibold">
                                Umur
                            </td>
                            <td>{diagnosis.umur_kategori}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* GEJALA */}
            <div className="mt-8">
                <h2 className="font-bold text-lg border-b pb-2">
                    C. Gejala yang Dipilih
                </h2>
                <table className="w-full mt-4 border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">No</th>
                            <th className="border p-2">Kode</th>
                            <th className="border p-2">Gejala</th>
                            <th className="border p-2">Keyakinan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gejala_dipilih.map(
                            (item: any, index: number) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border p-2">
                                        {item.kode_gejala}
                                    </td>
                                    <td className="border p-2">
                                        {item.nama_gejala}
                                    </td>
                                    <td className="border p-2 text-center">
                                        {(item.cf_user * 100).toFixed(0)}%
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            {/* HASIL */}
            <div className="mt-8">
                <h2 className="font-bold text-lg border-b pb-2">
                    D. Hasil Diagnosis
                </h2>
                <table className="w-full mt-3">
                    <tbody>
                        <tr>
                            <td className="w-52 font-semibold">
                                Penyakit
                            </td>
                            <td>
                                {penyakit.nama_penyakit}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold">
                                Nilai CF
                            </td>
                            <td>
                                {(diagnosis.cf_final * 100).toFixed(2)}%
                            </td>
                        </tr>
                        <tr>
                            <td className="font-semibold">
                                Kategori
                            </td>
                            <td>
                                {penyakit.kategori_penyakit}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-5">
                    <h3 className="font-semibold">
                        Deskripsi
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-justify">
                        {penyakit.deskripsi}
                    </p>
                </div>
                <div className="mt-5">
                    <h3 className="font-semibold">
                        Penanganan Awal
                    </h3>
                    <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
                        {penyakit.penanganan_awal
                            ?.split(",")
                            .map((item: string, index: number) => (
                                <li key={index}>
                                    {item.trim()}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>

            {/* PEMBANDING */}
            <div className="mt-8">
                <h2 className="font-bold text-lg border-b pb-2">
                    E. Diagnosis Pembanding
                </h2>
                <table className="w-full mt-4 border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">
                                Penyakit
                            </th>
                            <th className="border p-2">
                                Nilai CF
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {diagnosis_banding.map((item: any, index: number) => (
                            <tr key={index}>
                                <td className="border p-2">
                                    {item.nama_penyakit}
                                </td>
                                <td className="border p-2 text-center">
                                    {(item.cf_score * 100).toFixed(2)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* FOOTER */}
            <div className="mt-16 border-t pt-5 text-sm text-gray-600">
                <p>
                    Dicetak :
                    {" "}
                    {new Date().toLocaleString("id-ID")}
                </p>
                <p className="mt-2">
                    Laporan ini merupakan hasil diagnosis awal menggunakan metode
                    Forward Chaining dan Certainty Factor. Hasil diagnosis
                    digunakan sebagai rekomendasi awal dan tidak menggantikan
                    pemeriksaan langsung oleh dokter hewan.
                </p>
            </div>
        </div>
    );
}