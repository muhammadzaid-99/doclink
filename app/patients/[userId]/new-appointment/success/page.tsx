import Link from 'next/link'
import Image from 'next/image'
import { getAppointment } from '@/lib/actions/appointments.actions';
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import * as Sentry from '@sentry/nextjs';
import { getUser } from '@/lib/actions/patient.actions';

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
    const user = await getUser(userId);
    Sentry.metrics.set("user_view_success", user.name);
    
    const appointmentId = (searchParams?.appointmentId as string) || '';
    const appointment = await getAppointment(appointmentId);
    const doctor = Doctors.find(doctor => doctor.name === appointment.primaryPhysician);
    
    return (
        <div className="flex h-screen max-h-screen px-[5%]">
            <div className="success-img">
                <Link href="/">
                    <Image
                        src="/assets/icons/logo-full-dl.png"
                        height={575} width={187} alt="logo"
                        className="h-16 w-fit"
                    />
                </Link>
                <section className="flex flex-col items-center">
                    <Image src="/assets/gifs/success.gif" height={300} width={280} alt="success" />
                    <h2 className="header mb-6 max-w-[600px] text-center">
                        Your <span className="text-green-500">appointment request</span> has been successfully submitted!
                    </h2>
                    <p>
                        We will get back to you shortly with the confirmation details.
                    </p>
                </section>
                <section className='request-details'>
                    {/* <p>Details:</p> */}
                    <div className="flex items-center gap-3">
                        <Image src={doctor?.image!} height={100} width={100} alt="doctor" className="size-6" />
                        <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <Image
                            src="/assets/icons/calendar.svg"
                            height={24}
                            width={24}
                            alt="calendar"
                        />
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>
                <Button variant="outline" className="shad-primary-btn" asChild>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New Appointment
                    </Link>
                </Button>
                <p className="copyright">&copy; 2024 DocLink. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Success