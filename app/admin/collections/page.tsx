import { SiteHeader } from "@/components/site-header";
import AddCollectionForm from "@/components/AddCollectionForm";
import {CollectionTable} from "@/components/CollectionTable";

export default function CollectionPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <div className="p-6 space-y-8">
        <AddCollectionForm />
        <CollectionTable />
      </div>
    </div>
  );
}
