import { useEffect, useRef, useState } from "react";
import Header from "../components/common/Header";
import { motion } from "framer-motion";
import {
    Monitor,
    Mic,
    MicOff,
    Phone,
    PhoneOff,
    Copy,
    Check,
    MousePointer,
} from "lucide-react";
import { toast } from "react-toastify";

const ContactPage = () => {
    // 使用 ref 来跟踪是否已经显示过提示
    const hasShownToast = useRef(false);
    useEffect(() => {
        if (!hasShownToast.current) {
            toast("功能未完善，请使用其他页面");
            hasShownToast.current = true;
        }
    }, []);

    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [isCalling, setIsCalling] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [peerId, setPeerId] = useState("");
    const [remotePeerId, setRemotePeerId] = useState("");
    const [copied, setCopied] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [isRemoteControlling, setIsRemoteControlling] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isHost, setIsHost] = useState(false);

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const dataChannelRef = useRef(null);
    const canvasRef = useRef(null);

    // 生成随机ID
    useEffect(() => {
        const id = Math.floor(Math.random() * 1000000).toString();
        setPeerId(id);
    }, []);

    // 初始化WebRTC连接
    const initializePeerConnection = (stream) => {
        const configuration = {
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                { urls: "stun:stun1.l.google.com:19302" },
            ],
        };

        const peerConnection = new RTCPeerConnection(configuration);
        peerConnectionRef.current = peerConnection;

        // 添加本地流
        stream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, stream);
        });

        // 创建数据通道
        const dataChannel = peerConnection.createDataChannel("remoteControl");
        dataChannelRef.current = dataChannel;

        dataChannel.onopen = () => {
            console.log("数据通道已打开");
        };

        dataChannel.onclose = () => {
            console.log("数据通道已关闭");
        };

        dataChannel.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                handleCollaborationData(data);
            } catch (error) {
                console.error("解析数据失败:", error);
            }
        };

        // 监听远程流
        peerConnection.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        // 监听ICE候选
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                // 在实际应用中，这里应该将ICE候选发送给对方
                console.log("ICE候选:", event.candidate);
            }
        };

        // 监听连接状态
        peerConnection.onconnectionstatechange = () => {
            console.log("连接状态:", peerConnection.connectionState);
            if (peerConnection.connectionState === "connected") {
                setIsConnected(true);
                setIsCalling(false);
            } else if (
                peerConnection.connectionState === "disconnected" ||
                peerConnection.connectionState === "failed"
            ) {
                endCall();
            }
        };

        // 监听数据通道
        peerConnection.ondatachannel = (event) => {
            dataChannelRef.current = event.channel;

            event.channel.onmessage = (e) => {
                try {
                    const data = JSON.parse(e.data);
                    handleCollaborationData(data);
                } catch (error) {
                    console.error("解析数据失败:", error);
                }
            };
        };

        return peerConnection;
    };

    // 发起共享（主持人）
    const startCall = async () => {
        if (!remotePeerId) {
            alert("请输入对方ID");
            return;
        }

        setIsCalling(true);
        setIsHost(true);

        try {
            // 获取屏幕共享流
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true,
            });

            setLocalStream(stream);

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }

            // 监听屏幕共享停止
            stream.getVideoTracks()[0].onended = () => {
                endCall();
            };

            setIsScreenSharing(true);
        } catch (error) {
            console.error("获取屏幕共享失败:", error);
            setIsCalling(false);
            setIsHost(false);
            return;
        }

        const peerConnection = initializePeerConnection(localStream);

        try {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            // 在实际应用中，这里应该将offer发送给对方
            console.log("创建的offer:", offer);

            // 模拟发送offer给对方
            setTimeout(() => {
                setIsConnected(true);
                setIsCalling(false);
            }, 2000);
        } catch (error) {
            console.error("创建offer失败:", error);
            setIsCalling(false);
            setIsHost(false);
        }
    };

    // 接受共享（观看者）
    const answerCall = async () => {
        if (!remotePeerId) {
            alert("请输入对方ID");
            return;
        }

        setIsCalling(true);

        try {
            // 只获取音频流，不需要屏幕共享
            const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });

            setLocalStream(audioStream);

            const peerConnection = initializePeerConnection(audioStream);

            // 模拟接收offer和发送answer
            setTimeout(() => {
                setIsConnected(true);
                setIsCalling(false);
            }, 2000);
        } catch (error) {
            console.error("创建answer失败:", error);
            setIsCalling(false);
        }
    };

    // 结束通话
    const endCall = () => {
        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
            setLocalStream(null);
        }

        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }

        setIsConnected(false);
        setIsCalling(false);
        setRemoteStream(null);
        setIsScreenSharing(false);
        setIsRemoteControlling(false);
        setIsHost(false);

        if (localVideoRef.current) {
            localVideoRef.current.srcObject = null;
        }

        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
        }
    };

    // 切换麦克风状态
    const toggleMute = () => {
        if (localStream) {
            const audioTracks = localStream.getAudioTracks();
            if (audioTracks.length > 0) {
                const enabled = !audioTracks[0].enabled;
                audioTracks[0].enabled = enabled;
                setIsMuted(!enabled);
            }
        }
    };

    // 处理远程控制数据
    const handleCollaborationData = (data) => {
        if (!isRemoteControlling) return;

        switch (data.type) {
            case "cursor":
                // 更新远程鼠标位置
                setCursorPosition(data.position);
                break;
            case "mousedown":
                // 远程鼠标点击
                if (isHost && isRemoteControlling) {
                    simulateMouseEvent("mousedown", data.position);
                }
                break;
            case "mouseup":
                // 远程鼠标释放
                if (isHost && isRemoteControlling) {
                    simulateMouseEvent("mouseup", data.position);
                }
                break;
            case "click":
                // 远程鼠标点击
                if (isHost && isRemoteControlling) {
                    simulateMouseEvent("click", data.position);
                }
                break;
            default:
                console.log("未知数据类型:", data.type);
        }
    };

    // 模拟鼠标事件
    const simulateMouseEvent = (eventType, position) => {
        if (!localVideoRef.current) return;

        const rect = localVideoRef.current.getBoundingClientRect();
        const x = position.x + rect.left;
        const y = position.y + rect.top;

        const event = new MouseEvent(eventType, {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y,
        });

        document.elementFromPoint(x, y)?.dispatchEvent(event);
    };

    // 处理鼠标移动
    const handleMouseMove = (e) => {
        if (isHost) return; // 主持人不需要处理

        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const position = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        // 发送鼠标位置给对方
        if (
            dataChannelRef.current &&
            dataChannelRef.current.readyState === "open"
        ) {
            dataChannelRef.current.send(
                JSON.stringify({
                    type: "cursor",
                    position,
                })
            );
        }
    };

    // 处理鼠标按下
    const handleMouseDown = (e) => {
        if (isHost) return; // 主持人不需要处理

        const rect = canvasRef.current.getBoundingClientRect();
        const position = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        if (
            isRemoteControlling &&
            dataChannelRef.current &&
            dataChannelRef.current.readyState === "open"
        ) {
            dataChannelRef.current.send(
                JSON.stringify({
                    type: "mousedown",
                    position,
                })
            );

            // 短暂延迟后发送点击事件
            setTimeout(() => {
                dataChannelRef.current.send(
                    JSON.stringify({
                        type: "click",
                        position,
                    })
                );
            }, 50);
        }
    };

    // 处理鼠标释放
    const handleMouseUp = (e) => {
        if (isHost) return; // 主持人不需要处理

        if (
            isRemoteControlling &&
            dataChannelRef.current &&
            dataChannelRef.current.readyState === "open"
        ) {
            const rect = canvasRef.current.getBoundingClientRect();
            const position = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };

            dataChannelRef.current.send(
                JSON.stringify({
                    type: "mouseup",
                    position,
                })
            );
        }
    };

    // 切换远程控制模式
    const toggleRemoteControl = () => {
        setIsRemoteControlling(!isRemoteControlling);
    };

    // 复制ID到剪贴板
    const copyPeerId = () => {
        navigator.clipboard.writeText(peerId).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="远程协作" />
            <main className="max-w-5xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <Monitor className="text-blue-600 mr-4" size="24" />
                            <h2 className="text-xl font-semibold text-gray-900">
                                远程屏幕共享与控制
                            </h2>
                        </div>
                    </div>

                    {/* 屏幕共享区域 */}
                    <div className="mb-6">
                        <div className="relative bg-black rounded-xl overflow-hidden aspect-video shadow-lg">
                            {isHost ? (
                                // 主持人看到自己的屏幕
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    muted
                                    playsInline
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                // 观看者看到主持人的屏幕
                                <video
                                    ref={remoteVideoRef}
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-contain"
                                />
                            )}

                            {/* 远程控制画布 - 只在观看者模式下显示 */}
                            {isRemoteControlling && !isHost && (
                                <canvas
                                    ref={canvasRef}
                                    className="absolute inset-0 w-full h-full pointer-events-auto"
                                    onMouseMove={handleMouseMove}
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                />
                            )}

                            {/* 远程鼠标指针 - 只在主持人模式下显示 */}
                            {isConnected && isRemoteControlling && isHost && (
                                <div
                                    className="absolute pointer-events-none"
                                    style={{
                                        left: `${cursorPosition.x}px`,
                                        top: `${cursorPosition.y}px`,
                                        transform: "translate(-50%, -50%)",
                                    }}
                                >
                                    <MousePointer className="text-blue-500 w-6 h-6" />
                                </div>
                            )}

                            {/* 连接状态指示器 */}
                            {isCalling && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                                    <div className="text-white text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-2"></div>
                                        <p className="text-lg font-medium">
                                            正在连接...
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* 未连接提示 */}
                            {!isConnected && !isCalling && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                                    <div className="text-white text-center p-4">
                                        <Monitor
                                            className="mx-auto mb-2"
                                            size={48}
                                        />
                                        <p className="text-lg font-medium mb-2">
                                            准备开始远程协作
                                        </p>
                                        <p className="text-sm opacity-80">
                                            点击下方按钮发起或接受屏幕共享
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 连接控制区域 */}
                    <div className="bg-white rounded-xl p-4 shadow-md mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex flex-col md:flex-row gap-4 flex-1">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        您的ID
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value={peerId}
                                            readOnly
                                            className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 bg-gray-50 text-gray-700"
                                        />
                                        <button
                                            onClick={copyPeerId}
                                            className="bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-r-lg px-4 py-2 flex items-center"
                                        >
                                            {copied ? (
                                                <Check size={18} />
                                            ) : (
                                                <Copy size={18} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        对方ID
                                    </label>
                                    <input
                                        type="text"
                                        value={remotePeerId}
                                        onChange={(e) =>
                                            setRemotePeerId(e.target.value)
                                        }
                                        placeholder="输入对方ID进行连接"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 控制按钮区域 */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        {!isConnected ? (
                            <>
                                <button
                                    onClick={startCall}
                                    disabled={!remotePeerId || isCalling}
                                    className={`px-6 py-3 rounded-full flex items-center gap-2 ${
                                        remotePeerId && !isCalling
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                                >
                                    <Monitor size={20} />
                                    <span>发起共享</span>
                                </button>
                                <button
                                    onClick={answerCall}
                                    disabled={!remotePeerId || isCalling}
                                    className={`px-6 py-3 rounded-full flex items-center gap-2 ${
                                        remotePeerId && !isCalling
                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                                >
                                    <Phone size={20} />
                                    <span>接受共享</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={toggleMute}
                                    className={`p-3 rounded-full ${
                                        isMuted
                                            ? "bg-red-100 text-red-600"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    {isMuted ? (
                                        <MicOff size={24} />
                                    ) : (
                                        <Mic size={24} />
                                    )}
                                </button>
                                {!isHost && (
                                    <button
                                        onClick={toggleRemoteControl}
                                        className={`p-3 rounded-full ${
                                            isRemoteControlling
                                                ? "bg-green-100 text-green-600"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                        title="远程控制"
                                    >
                                        <MousePointer size={24} />
                                    </button>
                                )}
                                <button
                                    onClick={endCall}
                                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center gap-2"
                                >
                                    <PhoneOff size={20} />
                                    <span>结束共享</span>
                                </button>
                            </>
                        )}
                    </div>

                    {/* 使用说明 */}
                    <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-medium text-blue-800 mb-2">
                            使用说明
                        </h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
                            <li>
                                复制您的ID并分享给对方，或输入对方的ID进行连接
                            </li>
                            <li>
                                点击"发起共享"按钮开始屏幕共享（您将成为主持人）
                            </li>
                            <li>
                                点击"接受共享"按钮接受对方的屏幕共享（您将成为观看者）
                            </li>
                            <li>
                                观看者可以点击远程控制按钮，直接操控主持人的屏幕
                            </li>
                            <li>点击"结束共享"按钮可以终止当前共享</li>
                            <li>
                                注意：此功能需要浏览器支持WebRTC技术，并允许访问屏幕和麦克风
                            </li>
                        </ul>
                    </div>

                    {/* 隐私提示 */}
                    <div className="mt-4 text-xs text-gray-500 italic">
                        <p>
                            隐私说明：屏幕共享数据采用点对点加密传输，不经过服务器存储。请在安全的网络环境下使用。
                        </p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default ContactPage;
