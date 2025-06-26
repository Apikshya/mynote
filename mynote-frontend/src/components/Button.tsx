interface ButtonProps {
    text: String;
    onClick?: () => void;
}

export function Button({text , onClick}: ButtonProps){
    return <button onClick={onClick} className="p-4 px-4 bg-black/30 text-white my-4 rounded-md w-full flex justify-center items-center" >
        {text}
    </button>
}