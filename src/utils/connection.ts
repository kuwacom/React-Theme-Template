import React, { useContext } from "react";
import { wsMessage, wsSend } from '../types/connection';

export function messageToJson(message: string) {
    return JSON.parse(message) as wsMessage;
}

export const wsContext = React.createContext<{
    sessionId: string;
    lastMessage: MessageEvent<any> | null;
    messageHistory: wsMessage[];
    sendJsonMessage: (jsonMessage: wsSend, keep?: boolean) => void;
} | undefined>(undefined);
export function useWs() {
    const context = useContext(wsContext)
    if (context == undefined) {
        throw new Error("useWs is undefined");
    }
    return context;
}


export default { messageToJson, wsContext, useWs}