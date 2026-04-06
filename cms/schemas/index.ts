// Objects
import localizedString from './objects/localizedString'
import localizedText from './objects/localizedText'
import seoFields from './objects/seoFields'
import colorVariant from './objects/colorVariant'

// Documents
import product from './documents/product'
import category from './documents/category'
import brand from './documents/brand'
import testimonial from './documents/testimonial'
import promoCode from './documents/promoCode'

// Singletons
import siteSettings from './singletons/siteSettings'
import homePage from './singletons/homePage'
import aboutPage from './singletons/aboutPage'
import contactPage from './singletons/contactPage'
import legalPages from './singletons/legalPages'

export const schemaTypes = [
  // Objects
  localizedString,
  localizedText,
  seoFields,
  colorVariant,

  // Documents
  product,
  category,
  brand,
  testimonial,
  promoCode,

  // Singletons
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  legalPages,
]
