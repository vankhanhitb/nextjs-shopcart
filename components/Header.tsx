import CartIcon from "./CartIcon";
import Container from "./Container";
import FavoriteButton from "./FavoriteButton";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo"
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar"
import SignIn from "./SignIn";

export default function Header(){
  return(
    <header className="header bg-white py-5 border-b border-b-black-50">
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
          <SignIn />
        </div>
      </Container>
    </header>
  )
}