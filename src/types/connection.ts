export type wsMessageType = 'createSession' | 'sendMessage';
export type wsMessageResult = 'success' | 'error';
export interface wsMessage {
    type: wsMessageType;
    sessionId?: string;
    message?: string;
    result?: wsMessageResult;
    path: string;
}

export type wsSendType = 'sendMessage' | 'detectImage';
export interface wsSend {
    type: wsSendType;
    targetSessionId?: string;
    message?: string;
}