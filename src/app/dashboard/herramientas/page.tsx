"use client";

import { useState, useRef, useEffect } from "react";
import { ClipboardCopy } from "lucide-react";

type Mode = "encode" | "decode" | "userpass";

export default function HerramientasPage() {
    const [mode, setMode] = useState<Mode>("encode");
    const [input, setInput] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const resultRef = useRef<HTMLTextAreaElement | null>(null);

    const process = () => {
        setError("");

        try {
            let output = "";

            if (mode === "userpass") {
                if (!username || !password) {
                    setError("⚠️ Usuario y contraseña son obligatorios.");
                    return;
                }
                output = btoa(`${username}:${password}`);
            } else if (mode === "encode") {
                output = btoa(unescape(encodeURIComponent(input.trim())));
            } else if (mode === "decode") {
                output = decodeURIComponent(escape(atob(input.trim())));
            }

            setResult(output);
            setCopied(false);
        } catch (e) {
            setResult("Error al procesar el texto");
        }
    };

    const copyToClipboard = async () => {
        if (!result) return;
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadAsFile = () => {
        if (!result) return;
        const blob = new Blob([result], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resultado.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            process();
        }
    };

    useEffect(() => {
        if (mode !== "userpass" && inputRef.current) {
            inputRef.current.focus();
        }
    }, [mode]);

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Herramientas Base64</h1>

            <div className="mb-4">
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value as Mode)}
                    className="border rounded p-2 bg-white text-gray-800"
                >
                    <option value="encode">Codificar texto</option>
                    <option value="decode">Decodificar Base64</option>
                    <option value="userpass">Usuario:Contraseña → Base64</option>
                </select>
            </div>

            {mode === "userpass" ? (
                <>
                    <div className="mb-4 flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Usuario"
                            className="flex-1 p-3 bg-white text-gray-800 rounded border"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <span className="text-xl font-bold text-gray-600">:</span>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="flex-1 p-3 bg-white text-gray-800 rounded border"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                </>
            ) : (
                <textarea
                    ref={inputRef}
                    rows={6}
                    placeholder="Introduce texto aquí"
                    className="w-full p-3 bg-white text-gray-800 rounded border resize-y"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            )}

            {error && <p className="text-red-400 mt-2">{error}</p>}

            <div className="flex items-center gap-4 mt-6">
                <button
                    onClick={process}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 text-sm leading-none"
                >
                    Procesar
                </button>
                <button
                    onClick={() => {
                        setInput("");
                        setUsername("");
                        setPassword("");
                        setResult("");
                        setError("");
                        setCopied(false);
                        if (inputRef.current) inputRef.current.focus();
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 text-sm leading-none"
                >
                    Limpiar
                </button>
            </div>

            {result && (
                <div className="mt-6">
                    <label className="block mb-2 font-semibold">Resultado:</label>

                    <div className="relative">
                        <textarea
                            ref={resultRef}
                            readOnly
                            rows={4}
                            className="w-full p-3 bg-gray-100 text-gray-800 rounded border resize-y pr-10 cursor-pointer"
                            value={result}
                            onClick={copyToClipboard}
                        />

                        <button
                            onClick={copyToClipboard}
                            className="absolute top-2 right-2 p-1 text-gray-600 hover:text-gray-800"
                            title="Copiar"
                        >
                            <ClipboardCopy size={18} />
                        </button>
                    </div>


                    <div className="flex items-center gap-4 mt-2">
                        <button
                            onClick={copyToClipboard}
                            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-400 text-sm leading-none flex items-center gap-2"
                        >
                            Copiar al portapapeles
                        </button>
                        <button
                            onClick={downloadAsFile}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 text-sm leading-none"
                        >
                            Descargar .txt
                        </button>
                        {copied && <p className="text-green-400 text-sm">✅ Copiado</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
