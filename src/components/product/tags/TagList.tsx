import { Checkbox } from "@headlessui/react";

interface Tag {
  id: string;
  name: string;
}

interface TagListProps {
  tags: Tag[];
  checkedTags: { [key: string]: boolean };
  onCheckboxChange: (id: string) => void;
}

const TagList = ({ tags, checkedTags, onCheckboxChange }: TagListProps) => {
  return (
    <div>
      {tags.map((tag: Tag, i: number) => (
        <div className="flex pb-4" key={i}>
          <Checkbox
            checked={!!checkedTags[tag.id]}
            onChange={() => onCheckboxChange(tag.id)}
            className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
          >
            <svg
              className="stroke-white opacity-0 group-data-[checked]:opacity-100"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M3 8L6 11L11 3.5"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Checkbox>
          <p className="pr-2">{tag.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TagList;
