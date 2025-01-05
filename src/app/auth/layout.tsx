import Image from "next/image";

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="w-full flex bg-gray-50 dark:bg-gray-900 min-h-screen p-2 ">

                <div className="md:w-1/3 hidden md:flex flex-col justify-between items-center bg-bgDimLight rounded-md">
                    <div className="mt-24 px-5">
                        <h1 className="text-2xl text-gray-800 dark:text-gray-600 text-center">Change Your View on Coin Transcations</h1>
                        <p className="text-md mt-4 text-center text-gray-800 dark:text-gray-600">Here is the brief descripton of something about some lines Here is the brief descripton of something about some lines</p>
                    </div>
                    <div className="flex">
                        <Image src={'https://res.cloudinary.com/dbqq41bpc/image/upload/v1735937100/rb_2147999804_1_jl1v5l.png'} width={700} height={700} alt="register" className="w-40" />
                        <Image src={'https://res.cloudinary.com/dbqq41bpc/image/upload/v1735937101/rb_2148251209_1_wz6zdr.png'} width={700} height={700} alt="register" className="w-72" />
                    </div>
                </div>

                <div className="md:w-2/3 w-full flex items-center justify-center">
                    {children}
                </div>
            </div>
        </>
    );
}
