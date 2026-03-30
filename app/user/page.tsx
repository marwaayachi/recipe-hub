
import { getCategories } from "@/features/recipes/API/getCategories";

export default async function UserPage() {
    const categories = await getCategories();
   
  return (
    <div className="mt-30">
      <select
        name="category_id"
        
        className="w-full p-3 rounded-lg bg-white/90 text-gray-800"
        required
      >
        <option value="">Select category</option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id.toString()}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
