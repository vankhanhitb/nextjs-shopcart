import { Brand } from '@/sanity.types';
import React from 'react';
import { Title } from '../ui/text';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

interface Props {
  brands: Brand[],
  selectedBrand?: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string|null>>;
}

export default function BrandList({brands, selectedBrand, setSelectedBrand}: Props) {
  return (
    <div className="w-full bg-white p-5">
      <Title className="md:text-md text-md text-base font-black">Brands</Title>
      <RadioGroup
        value={selectedBrand || ""}
        className="mt-2 space-x-1"
        onValueChange={(value) => setSelectedBrand(value)}
      >
        {brands?.map((brand) => {
          const brandSlug = brand?.slug?.current;

          return (
            <div
              onClick={() => {
                if (!brandSlug) return;
                setSelectedBrand(brandSlug)
              }}
              key={brand?._id} 
              className="flex items-center space-x-2 hover:cursor-pointer"
            >
              <RadioGroupItem 
                value={brandSlug || ""} 
                id={brandSlug} 
                className="rounded-sm" 
              />
              <Label htmlFor={brandSlug}
                className={`${selectedBrand === brandSlug ? "font-semibold text-shop-dark-green" : "font-normal"}`}>
                {brand?.title}
              </Label>
            </div>
          )
        })}
        {selectedBrand && (
          <button
            onClick={() => setSelectedBrand(null)}
            className="text-sm font-medium mt-2 underline underline-offset-2 decoration-1 hover:text-shop-dark-green hoverEffect text-left"
          >
            Reset selection
          </button>
        )}
      </RadioGroup>
    </div>
  )
}
