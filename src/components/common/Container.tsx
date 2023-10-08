import { type PropsWithChildren } from 'react'

export default function Container(props: PropsWithChildren) {
    return (
        <div className='w-full sm:max-w-2xl h-full m-auto p-2 box-border flex flex-col'>
            {props.children}
        </div>
    )
}