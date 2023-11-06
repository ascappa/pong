import { RoomMenu } from "./_components/room-menu";

export default function Room({ params }: { params: { id: string } }) {
  return <RoomMenu roomId={params.id} />;
}
