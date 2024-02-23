import Image from "next/image";
import { testConnection } from "../../lib/mongo/connectionTest";

async function getConnection() {
  const connection = await testConnection();

  if (!connection) throw new Error('Test connection failed!')

  return connection
}

export default async function Home() {
  const thisConnection = await getConnection();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        { thisConnection }
      </div>
    </main>
  );
}

