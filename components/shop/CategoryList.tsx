import React from 'react'
import type { Category } from "@/sanity.types"
import { Title } from '../ui/text';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string|null>>;
}

export default function CategoryList({categories, selectedCategory, setSelectedCategory}: Props) {
  return (
    <div className="w-full bg-white p-5">
      <Title className="md:text-md text-md text-base font-black">Product Categories</Title>
      <RadioGroup
        value={selectedCategory || ""}
        className="mt-2 space-x-1"
        onValueChange={(value) => setSelectedCategory(value)}
      >
        {categories?.map((category) => {
          const categorySlug = category?.slug?.current;

          return (
            <div
              onClick={() => {
                if (!categorySlug) return;
                setSelectedCategory(categorySlug)
              }}
              key={category?._id} 
              className="flex items-center space-x-2 hover:cursor-pointer"
            >
              <RadioGroupItem 
                value={categorySlug || ""} 
                id={categorySlug} 
                className="rounded-sm" 
              />
              <Label htmlFor={categorySlug}
                className={`capitaline ${selectedCategory === categorySlug ? "font-semibold text-shop-dark-green" : "font-normal"}`}>
                {category?.title}
              </Label>
            </div>
          )
        })}
        {selectedCategory && (
          <Button
            onClick={() => setSelectedCategory(null)}
            className="text-sm font-medium mt-2 underline underline-offset-2 decoration-1 hover:text-shop-dark-green hoverEffect text-left"
          >
            Reset selection
          </Button>
        )}
      </RadioGroup>
    </div>
  )
}
