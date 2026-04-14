import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HarvestApp() {
  const [employeeId] = useState("FUNC-1029"); // ID já preenchido
  const [task, setTask] = useState("");
  const [line, setLine] = useState("");
  const [quantity, setQuantity] = useState("");
  const [records, setRecords] = useState([]);
  const [now, setNow] = useState(new Date());

  // relógio em tempo real (sempre atualizado)
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (!task || !line || !quantity) return;

    const newRecord = {
      employeeId,
      task,
      line,
      quantity,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    setRecords([newRecord, ...records]);
    setTask("");
    setLine("");
    setQuantity("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">App de Colheita</h1>

      {/* relógio em tempo real */}
      <div className="text-sm text-gray-600">
        Data e hora atual: {now.toLocaleDateString()} {now.toLocaleTimeString()}
      </div>

      <Card>
        <CardContent className="space-y-4 p-4">
          <div>
            <Label>ID Funcionária</Label>
            <Input value={employeeId} disabled />
          </div>

          <div>
            <Label>Tarefa</Label>
            <Input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Ex: apanhar tomate, podar, regar"
            />
          </div>

          <div>
            <Label>Linha</Label>
            <Input
              value={line}
              onChange={(e) => setLine(e.target.value)}
              placeholder="Ex: Linha 1, Estufa 3"
            />
          </div>

          <div>
            <Label>Quantidade</Label>
            <Input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Ex: 20 kg"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Registar
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Registos</h2>

        {records.map((r, i) => (
          <Card key={i}>
            <CardContent className="p-3 text-sm space-y-1">
              <p><b>ID:</b> {r.employeeId}</p>
              <p><b>Tarefa:</b> {r.task}</p>
              <p><b>Linha:</b> {r.line}</p>
              <p><b>Quantidade:</b> {r.quantity}</p>
              <p><b>Data:</b> {r.date}</p>
              <p><b>Hora:</b> {r.time}</p>
            </CardContent>
          </Card>
        ))}

        {records.length === 0 && (
          <p className="text-gray-500">Sem registos ainda.</p>
        )}
      </div>
    </div>
  );
}
