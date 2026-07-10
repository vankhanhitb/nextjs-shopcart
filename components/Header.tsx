
import CartIcon from "./CartIcon";
import Container from "./Container";
import FavoriteButton from "./FavoriteButton";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo"
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar"
import SignIn from "./SignIn";

import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, UserButton, Show } from "@clerk/nextjs";

export default async function Header(){
  const userCurrent = await currentUser();

  return(
    <header className="header bg-white/70 py-5 border-b border-b-black-50 sticky top-0 z-50 backdrop-blur-md">
      <Container className="max-w-full flex items-center justify-between text-light"> 
        {/* Logo */}
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        {/* NavButton */}
        <HeaderMenu />
        {/* NavAdmin */}
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <ClerkLoaded>
            <Show when="signed-out">
              <SignIn />
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  )
}