'use client'
import React, { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<'button'> & {
    onClick?: () => Promise<void> | void
}


const DataButton: React.FC<Props> = ({onClick, ...props}) => {
    return <button {...props} onClick={ async () => {
        if (onClick) await onClick();
    }}/>;
}
export default DataButton