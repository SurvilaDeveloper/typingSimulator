import { useState } from 'react';
import { useEffect } from "react";
import { useRef } from "react";
import typing0 from "./sounds/typing0.mp3"
import typing2 from "./sounds/typing2.mp3"
import typing3 from "./sounds/typing3.mp3"
import typing4 from "./sounds/typing4.mp3"
import typing5 from "./sounds/typing5.mp3"
import typingSpace from "./sounds/typingSpace.mp3"
import typingEnter from "./sounds/typingEnter.mp3"

const sounds = [
    typing0,
    typing2,
    typing3,
    typing4,
    typing5,
    typingSpace,
    typingEnter
];
const vol = [0.2, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2];

function typg(soundsArray: string[], volumeArray: number[]) {
    const audioObjectArray: HTMLAudioElement[] = []
    for (let i = 0; i < soundsArray.length; i++) {
        audioObjectArray.push(new Audio(soundsArray[i]));
        audioObjectArray[i].volume = 0;
    }
    document.addEventListener("click", () => {
        for (let i = 0; i < audioObjectArray.length; i++) {
            audioObjectArray[i].volume = 0;
            audioObjectArray[i].volume = volumeArray[i];
        }
    }, { once: true });
    document.addEventListener("keyup", () => {
        for (let i = 0; i < audioObjectArray.length; i++) {
            audioObjectArray[i].volume = 0;
            audioObjectArray[i].volume = volumeArray[i];
        }
    }, { once: true });

    return audioObjectArray
}

function typing() {
    return typg(sounds, vol)
}

const typ = typing();

function Cursor(props: { flickers?: boolean }) {
    const {
        flickers = true
    } = props
    const [cursor, setCursor] = useState(" ")
    useEffect(() => {
        let timeoutId: number | undefined;
        if (flickers) {
            timeoutId = setTimeout(() => {
                setCursor((prev) => (prev === " " ? "_" : " "));
            }, 500);
        } else {
            setCursor("_");
        }
        return () => clearTimeout(timeoutId);
    }, [flickers, cursor]);

    return (
        <span>{cursor}</span>
    )
}

const styles: React.CSSProperties = {
    fontFamily: "system-ui",
    fontSize: "16px",
    position: "unset",
    display: "block",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    whiteSpace: "normal",
    color: "rgb(0,0,0)",
    backgroundColor: "rgb(255,255,255)",
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    overflowY: "scroll",
    border: "1px solid black",
    borderRadius: "5px",
    cursor: "default",
    textWrap: "wrap",
}

function TypingSimulator(props: {
    id: string;
    style?: React.CSSProperties
    text?: string;
    eject?: number;
    bash?: boolean;
    addedHtml?: boolean;
    handleClick: any;
    velocity?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    endFunction?: () => void;
    children: any;
}) {
    const {
        id,
        style = styles,
        text = "",
        eject = 0,
        bash = false,
        addedHtml = false,
        handleClick,
        velocity = 5,
        endFunction,
        children
    } = props;

    const onClickHandler = () => {
        if (handleClick) handleClick();
    };


    const [textState, setTextState] = useState<string>(text)
    const counter = useRef(0);
    const containerRef = useRef<HTMLPreElement | null>(null);
    const userScroll = useRef(false);
    const [flickers, setFlickers] = useState(true)
    const [ejectState, setEjectState] = useState<number>(0)

    useEffect(() => {
        setEjectState(eject)
    }, [eject])

    useEffect(() => {
        let isMounted = true;
        const tx = Array.from(text)
        const loop = (count: number) => {
            if (!isMounted || eject === 0) {
                return
            }
            setTimeout(() => {
                if (text && count < Array.from(text).length) {
                    setFlickers(false)
                    setTextState((prev) => (prev + tx[count]))
                    counter.current++;
                    const ind = Math.floor(Math.random() * 5)
                    if (tx[count] === " ") {
                        typ[5].play().catch((e) => { console.warn(e); })
                    } else if (tx[count] === "\n") {
                        if (bash) {
                            setTextState((prev) => (prev + '>'))
                        }
                        typ[6].play().catch(e => { console.warn(e); })
                    } else {
                        typ[ind].play().catch(e => { console.warn(e); })
                    }
                    loop(counter.current);
                } else {
                    setFlickers(true)
                    if (bash) {
                        setTextState((prev) => (prev + '\n' + '>'))
                    } else {
                        setTextState((prev) => (prev + '\n'))
                    }
                    typ[6].play().catch(e => { console.warn(e); })
                    counter.current = 0;
                    endFunction && endFunction()
                }
            }, (Math.round(Math.random() * 500 / velocity) + 20))
        }
        if (addedHtml) {
            if (!isMounted || eject === 0) {
                return
            }
            if (bash) {
                setTextState((prev) => (prev + "\n" + text + "\n" + ">"))
            } else {
                setTextState((prev) => (prev + "\n" + text + "\n"))
            }
            endFunction && endFunction()
        } else {
            loop(counter.current)
        }
        return () => {
            isMounted = false;
        };
    }, [ejectState])

    useEffect(() => {
        if (containerRef.current && !userScroll.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [textState]);

    const handleScroll = () => {
        if (!containerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        userScroll.current = scrollTop + clientHeight < scrollHeight - 10;
    };

    return (
        <pre
            style={{ ...style }}
            id={id}
            ref={containerRef}
            onClick={onClickHandler}
            onScroll={handleScroll}
        >
            <span dangerouslySetInnerHTML={{ __html: (bash ? ">" : "") + textState }} style={{ width: 'auto', display: 'contents' }} />
            <Cursor flickers={flickers} />
            {children}

        </ pre>
    );
}

export default TypingSimulator;