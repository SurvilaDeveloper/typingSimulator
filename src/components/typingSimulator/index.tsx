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
            setCursor("");
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

interface HTMLText {
    tag: string;
    properties: string;
    content: string;
}

function TypingSimulator(props: {
    id: string;
    style?: React.CSSProperties
    text?: string;
    run?: boolean;
    bash?: boolean;
    isHtml?: boolean;
    handleClick: any;
    velocity?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    endFunction?: () => void;
    children: any;
}) {
    const {
        id,
        style = styles,
        text = "",
        run = false,
        bash = false,
        isHtml = false,
        handleClick,
        velocity = 5,
        endFunction,
        children
    } = props;

    const onClickHandler = () => {
        if (handleClick) handleClick();
    };

    const [defaultStyles, setDefaultStyles] = useState<React.CSSProperties>(styles)
    const [textState, setTextState] = useState<string>(text)
    const counter = useRef(0);
    const containerRef = useRef<HTMLPreElement | null>(null);
    const userScroll = useRef(false);
    const [flickers, setFlickers] = useState(true)
    const [ejectState, setEjectState] = useState<boolean>(false)

    useEffect(() => {
        setDefaultStyles({ ...defaultStyles, ...style })
    }, [style])

    useEffect(() => {
        setEjectState(run)
    }, [run])

    useEffect(() => {
        if (ejectState === false) {
            return
        }
        let isMounted = true;
        const tx = Array.from(text)
        const loop = (count: number) => {
            if (!isMounted || run === false) {
                return
            }
            setTimeout(() => {
                if (text && count < Array.from(text).length) {
                    setFlickers(false)
                    setTextState((prev) => (prev + tx[count]))
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
                    counter.current = counter.current + 1;
                    loop(counter.current);
                } else {
                    setFlickers(true)
                    if (bash) {
                        setTextState((prev) => (prev + '\n' + '>'))
                    } else {
                        setTextState((prev) => (prev + '\n'))
                    }
                    typ[6].play().catch(e => { console.warn(e); })
                    endFunction && endFunction()
                }
            }, (Math.round(Math.random() * 500 / velocity) + 20))
        }
        if (isHtml) {
            if (!isMounted || run === false) {
                return
            }
            if (bash) {
                setTextState((prev) => (prev + text + ">"))//((prev) => (prev + "\n" + text + "\n" + ">"))
            } else {
                setTextState((prev) => (prev + text))//((prev) => (prev + "\n" + text + "\n"))
            }
            endFunction && endFunction()
        } else {
            loop(counter.current)
        }
        return () => {
            isMounted = false;
            counter.current = 0;
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
            style={{ ...defaultStyles }}
            id={id}
            ref={containerRef}
            onClick={onClickHandler}
            onScroll={handleScroll}
        >
            <span dangerouslySetInnerHTML={{ __html: (bash ? ">" : "") + textState + (flickers ? " " : "_") }} style={{ width: 'auto', display: 'contents' }} />
            <Cursor flickers={flickers} />
            {children}
        </ pre>
    );
}

function TypingSimulatorControl(props: {
    id: string;
    style?: React.CSSProperties
    bash?: boolean;
    typed?: boolean;
    handleClick: any;
    velocity?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    endFunction?: () => void;
    children: any;
    textsArray?: string[] | HTMLText[];
    run: boolean;
}) {
    const {
        id,
        style = styles,
        bash = false,
        typed = true,
        handleClick,
        velocity = 5,
        endFunction,
        children,
        textsArray,
        run
    } = props;

    const [textsArrayState] = useState<string[] | HTMLText[] | undefined>(textsArray)
    const [beginState, setBeginState] = useState<boolean>(false)
    const [textState, setTextState] = useState<string>("")
    const [ejectState, setEjectState] = useState<boolean>(false)
    const count = useRef(0)
    const [next, setNext] = useState(false)
    const [nextHtml, setNextHtml] = useState(false)
    const [isHtmlState, setIsHtmlState] = useState(false)///////////////
    const [isTag, setIsTag] = useState(false)
    const [writePart, setWritePart] = useState(0)
    const [bashState] = useState(bash)
    const [typedState] = useState(typed)

    useEffect(() => {
        return setBeginState(run);
    }, [run])

    useEffect(() => {
        if (textsArrayState?.length === 0 || beginState === false) { return }
        if (
            Array.isArray(textsArrayState)
            && typeof textsArrayState[0] === "string"
        ) {
            setIsHtmlState(false)
            setNext(!next);
        } else if (
            Array.isArray(textsArrayState) &&
            typeof textsArrayState[0] === "object" &&
            "tag" in textsArrayState[0] &&
            "properties" in textsArrayState[0] &&
            "content" in textsArrayState[0]
        ) {
            setIsHtmlState(true)
            setNextHtml(!nextHtml);
        }
    }, [beginState])

    useEffect(() => {
        if (textsArrayState?.length === 0 || beginState === false) { return }
        if (count.current === textsArrayState?.length) {
            return
        }
        if (textsArrayState) {

            if (typedState) {
                setTextState(textsArrayState[count.current] as string)
                setIsTag(false)
                setEjectState(true)

            } else {
                setTextState(textsArrayState[count.current] as string)
                setIsTag(true)
                setEjectState(true)
            }
        }
    }, [next])

    useEffect(() => {
        if (textsArrayState?.length === 0 || beginState === false) { return }
        if (count.current === textsArrayState?.length) {
            return
        }
        if (textsArrayState) {
            if (writePart === 0) {
                const tx = "<" + (textsArrayState[count.current] as HTMLText).tag + " " + (textsArrayState[count.current] as HTMLText).properties + ">"
                setWritePart(1);
                setTextState(tx)
                setIsTag(true)
                setEjectState(true)
            } else if (writePart === 1) {
                setTextState((textsArrayState[count.current] as HTMLText).content)
                setWritePart(2)
                setIsTag(false)
                setEjectState(true)
            } else if (writePart === 2) {
                setWritePart(0)
                const tx = "</" + (textsArrayState[count.current] as HTMLText).tag + ">" + (bashState ? ">" : "")
                setTextState(tx)
                setIsTag(true)
                setEjectState(true)
                //setBashState(true)
                count.current = count.current + 1
            }
        }
    }, [nextHtml])

    function nextStep() {
        console.log("nextStep");
        setNext(!next)
        setEjectState(false)
        count.current = count.current + 1
    }

    function nextStepHtml() {
        setNextHtml(!nextHtml)
        setEjectState(false)
    }

    const end = () => {
        if (count.current + 1 === textsArrayState?.length) {
            setBeginState(false)
            setEjectState(false)
            count.current = 0;
            endFunction && endFunction()
            return
        }
        setTimeout(() => {
            if (isHtmlState) {
                setEjectState(false)
                nextStepHtml()
            } else {
                setEjectState(false)
                nextStep()
            }
        }, 200)
    }

    return (
        <TypingSimulator
            text={textState}
            run={ejectState}
            id={id}
            style={style}
            bash={false}
            handleClick={handleClick}
            velocity={velocity}
            children={children}
            endFunction={end}
            isHtml={isTag}
        />
    )
}

export { TypingSimulator, TypingSimulatorControl };
export type { HTMLText };
