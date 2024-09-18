import Hamster from '/woman.png';

const Error = () => {
    return (
        <>
            <card
                className="tw-flex tw-justify-center tw-items-center tw-h-[100vh] tw-flex-col tw-gap-4 tw-bg-cyan-200">
                <img src={Hamster} className="tw-w-[140px]" alt={'Logo'}/>
                <h1>404 - Page Not Found 😔</h1>
            </card>
        </>
    );
};

export default Error;
