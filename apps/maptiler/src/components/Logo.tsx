import Image from "next/image";

export function Logo() {
    return (
        <Image src="/logo.svg" width={318} height={42} alt="logo"/>
    );
}