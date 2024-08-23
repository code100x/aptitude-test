const Unauthenticated = () => {
    return (
        <div className="w-full min-h-96 flex flex-col items-center justify-center mt-auto">
            <p className="text-lg font-semibold">Looks like you&apos;re not logged in</p>
            <p className="text-3xl font-bold">Please Log In to proceed</p>
        </div>
    )
}

export default Unauthenticated;