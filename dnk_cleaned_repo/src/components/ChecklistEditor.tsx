import { ChangeEvent } from 'react';

export type ChecklistItem = { id:string, label:string, required?:boolean };
export function ChecklistEditor({ items, onChange }: { items: ChecklistItem[]; onChange: (items:ChecklistItem[])=>void }){
  // ... implementation stays the same
}
