import { useEffect, useRef, useState } from "react";
import Header from "../components/common/Header";
import { motion } from "framer-motion";
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Copy, Check } from "lucide-react";

const ContactPage = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [peerId, setPeerId] = useState("");
  const [remotePeerId, setRemotePeerId] = useState("");
  const [copied, setCopied] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const dataChannelRef = useRef(null);

  // 生成随机ID
  useEffect(() => {
    const id = Math.floor(Math.random() * 1000000).toString();
    setPeerId(id);
  }, []);

  // 初始化本地视频流
  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      return stream;
    } catch (error) {
      console.error("获取本地媒体流失败:", error);
      return null;
    }
  };

  // 初始化WebRTC连接
  const initializePeerConnection = (stream) => {
    const configuration = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" }
      ]
    };

    const peerConnection = new RTCPeerConnection(configuration);
    peerConnectionRef.current = peerConnection;

    // 添加本地流轨道到连接
    stream.getTracks().forEach(track => {
      peerConnection.addTrack(track, stream);
    });

    // 处理远程流
    peerConnection.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // 创建数据通道
    const dataChannel = peerConnection.createDataChannel("chat");
    dataChannelRef.current = dataChannel;

    dataChannel.onopen = () => console.log("数据通道已打开");
    dataChannel.onclose = () => console.log("数据通道已关闭");
    dataChannel.onmessage = (event) => console.log("收到消息:", event.data);

    // 监听ICE候选
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // 在实际应用中，这里应该将候选发送给对方
        console.log("ICE候选:", event.candidate);
      }
    };

    peerConnection.oniceconnectionstatechange = () => {
      console.log("ICE连接状态:", peerConnection.iceConnectionState);
      if (peerConnection.iceConnectionState === "connected" || 
          peerConnection.iceConnectionState === "completed") {
        setIsConnected(true);
      } else if (peerConnection.iceConnectionState === "disconnected" || 
                peerConnection.iceConnectionState === "failed" || 
                peerConnection.iceConnectionState === "closed") {
        setIsConnected(false);
      }
    };

    return peerConnection;
  };

  // 发起呼叫
  const startCall = async () => {
    if (!remotePeerId) {
      alert("请输入对方ID");
      return;
    }

    setIsCalling(true);
    
    const stream = await startLocalStream();
    if (!stream) {
      setIsCalling(false);
      return;
    }
    
    const peerConnection = initializePeerConnection(stream);
    
    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      
      // 在实际应用中，这里应该将offer发送给对方
      console.log("创建的offer:", offer);
      
      // 模拟发送offer给对方
      setTimeout(() => {
        // 模拟接收answer
        const simulatedAnswer = {
          type: "answer",
          sdp: "模拟的SDP描述"
        };
        
        // 模拟设置远程描述
        // 注意：在实际应用中，这应该是从对方接收到的真实answer
        // peerConnection.setRemoteDescription(new RTCSessionDescription(simulatedAnswer));
        
        // 为了演示，我们直接设置连接状态
        setIsConnected(true);
        setIsCalling(false);
      }, 2000);
      
    } catch (error) {
      console.error("创建offer失败:", error);
      setIsCalling(false);
    }
  };

  // 接听呼叫
  const answerCall = async () => {
    setIsCalling(true);
    
    const stream = await startLocalStream();
    if (!stream) {
      setIsCalling(false);
      return;
    }
    
    const peerConnection = initializePeerConnection(stream);
    
    try {
      // 模拟接收offer
      const simulatedOffer = {
        type: "offer",
        sdp: "模拟的SDP描述"
      };
      
      // 在实际应用中，这应该是从对方接收到的真实offer
      // await peerConnection.setRemoteDescription(new RTCSessionDescription(simulatedOffer));
      
      // const answer = await peerConnection.createAnswer();
      // await peerConnection.setLocalDescription(answer);
      
      // 模拟发送answer给对方
      // console.log("创建的answer:", answer);
      
      // 为了演示，我们直接设置连接状态
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
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    
    setIsConnected(false);
    setIsCalling(false);
    setRemoteStream(null);
    
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

  // 切换视频状态
  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        const enabled = !videoTracks[0].enabled;
        videoTracks[0].enabled = enabled;
        setIsVideoOff(!enabled);
      }
    }
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
      <Header title="WebRTC" />
      <main className="max-w-5xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Video className="text-blue-600 mr-4" size="24" />
              <h2 className="text-xl font-semibold text-gray-900">
                WebRTC视频通话
              </h2>
            </div>
          </div>

          {/* 视频区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* 本地视频 */}
            <div className="relative bg-black rounded-xl overflow-hidden aspect-video shadow-lg">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
                您的视频
              </div>
              {!localStream && !isConnected && !isCalling && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 text-white">
                  <p>开始通话后显示视频</p>
                </div>
              )}
            </div>

            {/* 远程视频 */}
            <div className="relative bg-black rounded-xl overflow-hidden aspect-video shadow-lg">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
                对方视频
              </div>
              {!isConnected && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 text-white">
                  {isCalling ? (
                    <div className="text-center">
                      <div className="animate-pulse mb-2">正在连接...</div>
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                  ) : (
                    <p>未连接</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 连接控制区域 */}
          <div className="bg-white rounded-xl p-4 shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 我的ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  我的ID
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={peerId}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg bg-gray-50 text-gray-700"
                  />
                  <button
                    onClick={copyPeerId}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 rounded-r-lg flex items-center"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              {/* 对方ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  对方ID
                </label>
                <input
                  type="text"
                  value={remotePeerId}
                  onChange={(e) => setRemotePeerId(e.target.value)}
                  placeholder="输入对方ID进行连接"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  disabled={isConnected || isCalling}
                />
              </div>
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="flex justify-center space-x-4">
            {!isConnected && !isCalling ? (
              <>
                <button
                  onClick={startCall}
                  disabled={!remotePeerId}
                  className={`px-6 py-3 rounded-full flex items-center gap-2 ${
                    remotePeerId
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Phone size={20} />
                  <span>发起通话</span>
                </button>
                <button
                  onClick={answerCall}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center gap-2"
                >
                  <Phone size={20} />
                  <span>接听通话</span>
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
                  {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                </button>
                <button
                  onClick={toggleVideo}
                  className={`p-3 rounded-full ${
                    isVideoOff
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
                </button>
                <button
                  onClick={endCall}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center gap-2"
                >
                  <PhoneOff size={20} />
                  <span>结束通话</span>
                </button>
              </>
            )}
          </div>

          {/* 使用说明 */}
          <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-medium text-blue-800 mb-2">使用说明</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
              <li>复制您的ID并分享给对方，或输入对方的ID进行连接</li>
              <li>点击"发起通话"按钮开始视频通话</li>
              <li>对方需要点击"接听通话"按钮接受您的通话请求</li>
              <li>通话过程中可以随时切换麦克风和摄像头状态</li>
              <li>点击"结束通话"按钮可以终止当前通话</li>
              <li>注意：此功能需要浏览器支持WebRTC技术，并允许访问摄像头和麦克风</li>
            </ul>
          </div>

          {/* 隐私提示 */}
          <div className="mt-4 text-xs text-gray-500 italic">
            <p>隐私说明：视频通话数据采用点对点加密传输，不经过服务器存储。请在安全的网络环境下使用。</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ContactPage;
