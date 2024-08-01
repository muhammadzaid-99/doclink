import React from 'react'
import Image from 'next/image';
import Link from 'next/link'
import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.actions';
import * as Sentry from '@sentry/nextjs';

const Register = async ({ params: { userId } }: SearchParamProps) => {

  // Add 'jane' to a set
  // used for tracking the number of users that viewed a page.
  const user = await getUser(userId);
  Sentry.metrics.set("user_view_register", user.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full-dl.png"
            alt="DocLink"
            width={575}
            height={187}
            className="mb-12 h-12 w-fit"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">
            &copy; 2024 DocLink. All rights reserved.
          </p>

        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000} width={1000} alt="Register Image"
        className="side-img max-w-[390px]"
      />
    </div>
  )
}

export default Register