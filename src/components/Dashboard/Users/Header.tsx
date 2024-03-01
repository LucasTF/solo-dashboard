import { usersStructure } from "@/lib/structures";
import { UsersSearch } from "./Search";

import { BaseHeader } from "../BaseHeader";

// TODO: Add New User Form
export const UsersHeader = () => {
  return (
    <BaseHeader
      searchComponent={<UsersSearch tableStructure={usersStructure} />}
      newEntryButtonText="Novo usuário"
      newEntryModalComponent={<p className="m-4">New User Form</p>}
      newEntryModalTitle="Novo Usuário"
    />
  );
};
