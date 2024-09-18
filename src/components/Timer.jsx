import {useEffect, useState} from 'react';

const Timer = () => {
    const [timeElapsed, setTimeElapsed] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const startDate = new Date('2024-05-30T00:00:00');

        const updateTimer = () => {
            const now = new Date();
            const totalSeconds = Math.floor((now - startDate) / 1000);

            const years = Math.floor(totalSeconds / (3600 * 24 * 365));
            const months = Math.floor((totalSeconds % (3600 * 24 * 365)) / (3600 * 24 * 30));
            const days = Math.floor((totalSeconds % (3600 * 24 * 30)) / (3600 * 24));
            const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            setTimeElapsed({
                years,
                months,
                days,
                hours,
                minutes,
                seconds,
            });
        };

        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="tw-flex tw-items-center tw-justify-center">
            <div
                className="tw-flex tw-gap-4 tw-text-center  tw-py-4 tw-px-6  tw-text-white">
                <div>
                    <div className="tw-text-3xl tw-font-bold tw-text-[#2f4f4f] ">{timeElapsed.years}</div>
                    <div className="tw-text-sm tw-text-gray-700">Years</div>
                </div>
                <div>
                    <div className="tw-text-3xl tw-font-bold tw-text-[#2f4f4f]">{timeElapsed.months}</div>
                    <div className="tw-text-sm tw-text-gray-700">Months</div>
                </div>
                <div>
                    <div className="tw-text-3xl tw-font-bold tw-text-[#2f4f4f]">{timeElapsed.days}</div>
                    <div className="tw-text-sm tw-text-gray-700">Days</div>
                </div>
                <div>
                    <div className="tw-text-3xl tw-font-bold tw-text-[#2f4f4f]">{timeElapsed.hours}</div>
                    <div className="tw-text-sm tw-text-gray-700">Hours</div>
                </div>
                <div>
                    <div className="tw-text-3xl tw-font-bold tw-text-[#2f4f4f]">{timeElapsed.minutes}</div>
                    <div className="tw-text-sm tw-text-gray-700">Minutes</div>
                </div>
                <div>
                    <div className="tw-text-3xl tw-font-bold tw-text-[#2f4f4f]">{timeElapsed.seconds}</div>
                    <div className="tw-text-sm tw-text-gray-700">Seconds</div>
                </div>
            </div>
        </div>

    );
};

export default Timer;
