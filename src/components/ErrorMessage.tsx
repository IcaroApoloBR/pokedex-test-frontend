export const ErrorMessage = ({ message }: { message: string | null }) => (
    <div className="flex justify-center h-screen">
        <p className="text-colorSecondary font-semibold text-center my-8">
            {message}
        </p>
    </div>
);