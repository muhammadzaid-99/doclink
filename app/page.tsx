import PatientForm from "@/components/forms/PatientForm";
import PasskeyModel from "@/components/PasskeyModel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export default function Home({searchParams} : SearchParamProps) {

  const isAdmin = searchParams?.admin === 'true';
  
  return (
    <div className="flex h-screen max-h-screen">

      {isAdmin && <PasskeyModel />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full-dl.png"
            alt="DocLink"
            width={575}
            height={187}
            className="mb-12 h-20 w-fit rounded-md"
          />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left tracking-wide">
              &copy; 2024 DocLink. All rights reserved.
            </p>
            <Link
              href="/?admin=true" className="text-green-500"
            >
              Admin
            </Link>
          </div>

        </div>
      </section>
      <Image
      src="/assets/images/onboarding-img2.jpg"
      height={1000} width={1000} alt="Onboarding Image"
      className="side-img max-w-[50%] brightness-50"
      />
    </div>
  );
}
