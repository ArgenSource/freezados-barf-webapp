import React from "react";
import { api } from "~/utils/api";

export default function Invitations() {
  const invitation = api.space.createInvitation.useMutation();
  return <div>Invitations</div>;
}
