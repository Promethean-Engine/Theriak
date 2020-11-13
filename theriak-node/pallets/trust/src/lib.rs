#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{decl_error, decl_event, decl_module, decl_storage, dispatch, traits::Get};
use frame_system::ensure_signed;

pub trait Trait: frame_system::Trait {
	type Event: From<Event<Self>> + Into<<Self as frame_system::Trait>::Event>;
}

decl_storage! {
	trait Store for Module<T: Trait> as TrustModule {
		CurrentIssued get(fn value1): u32;
		TrustIssuance get(fn key1): map hasher(blake2_128_concat) u32 => T::AccountId;
		CurrentRevoked get(fn value2): u32;
		TrustRevocation get(fn key2): map hasher(blake2_128_concat) u32 => T::AccountId;
	}
}

decl_event!(
	pub enum Event<T>
	where
		AccountId = <T as frame_system::Trait>::AccountId,
	{
		TrustIssued(AccountId, AccountId),
		TrustRevoked(AccountId, AccountId),
	}
);

decl_error! {
	pub enum Error for Module<T: Trait> {
		NoneValue,
		StorageOverflow,
	}
}

decl_module! {
	pub struct Module<T: Trait> for enum Call where origin: T::Origin {
		type Error = Error<T>;

		fn deposit_event() = default;

		#[weight = 10_000 + T::DbWeight::get().writes(1)]
		pub fn issue_trust(origin, address: T::AccountId) -> dispatch::DispatchResult {
			let who = ensure_signed(origin)?;

			let key: u32 = CurrentIssued::get();
			CurrentIssued::put(key + 1);
			<TrustIssuance<T>>::insert(key, &address);

			Self::deposit_event(RawEvent::TrustIssued(address, who));
			Ok(())
		}

		#[weight = 10_000 + T::DbWeight::get().writes(1)]
		pub fn revoke_trust(origin, address: T::AccountId) -> dispatch::DispatchResult {
			let who = ensure_signed(origin)?;

			let key: u32 = CurrentRevoked::get();
			CurrentRevoked::put(key + 1);
			<TrustRevocation<T>>::insert(key, &address);

			Self::deposit_event(RawEvent::TrustRevoked(address, who));
			Ok(())
		}
	}
}
