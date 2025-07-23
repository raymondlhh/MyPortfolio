# Project Pagination System

This portfolio now features a pagination system that displays 2 projects per page with swipe navigation for each project category.

## Features

- **2 Projects Per Page**: Each category shows exactly 2 projects per page
- **Swipe Navigation**: Users can swipe left/right on mobile devices to navigate between pages
- **Keyboard Navigation**: Arrow keys (←/→) can be used to navigate between pages
- **Visual Navigation**: Previous/Next buttons and page indicators
- **Page Counter**: Shows current page and total pages
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Transitions**: Fade-in animations when switching pages

## How It Works

### Project Categories
The pagination system works with all project categories:
- **XR Projects**: Virtual Reality (VR), Augmented Reality (AR), Mixed Reality (MR)
- **Others**: Game Development, 3D Modeling, 2D/3D Animation, Audio & Video Production

### Navigation Methods
1. **Touch/Swipe**: Swipe left for next page, swipe right for previous page
2. **Keyboard**: Press left arrow (←) for previous page, right arrow (→) for next page
3. **Mouse**: Click the previous/next buttons or page indicators
4. **Page Indicators**: Click on any dot to jump to that specific page

### Technical Implementation

#### Files Added/Modified:
- `pagination-system.js` - Main pagination logic
- `styles.css` - Pagination styles and responsive design
- `dynamic-projects.js` - Modified to integrate with pagination
- `script.js` - Modified to handle tab switching with pagination
- `test-pagination.js` - Test file for development (can be removed)

#### Key Components:

1. **ProjectPagination Class**: Main class that handles all pagination logic
2. **Page Grouping**: Projects are automatically grouped into pages of 2
3. **Navigation Controls**: Previous/Next buttons, page indicators, and page counter
4. **Touch Detection**: Swipe gesture detection for mobile devices
5. **Keyboard Events**: Arrow key navigation support
6. **Dynamic Integration**: Works with the existing Firebase dynamic loading system

## Usage

### For Users:
1. Navigate to any project category (VR, AR, MR, Game Development, etc.)
2. If there are more than 2 projects, pagination controls will appear
3. Use any of the navigation methods to browse through projects
4. Each page shows exactly 2 projects side by side (on desktop) or stacked (on mobile)

### For Developers:
The pagination system automatically:
- Detects when projects are loaded dynamically
- Creates pagination for categories with more than 2 projects
- Handles tab switching between categories
- Maintains separate page states for each category
- Refreshes pagination when new projects are loaded

### Testing:
To test the pagination system with sample data:
1. Open the browser console
2. Run: `testPagination.testAllCategories()`
3. This will populate all categories with 6 sample projects (3 pages each)

## Responsive Behavior

### Desktop (>768px):
- 2 projects displayed side by side
- Full navigation controls visible
- Hover effects on buttons

### Tablet (≤768px):
- Projects stack vertically
- Navigation controls wrap to multiple lines
- Page counter moves to top

### Mobile (≤480px):
- Compact navigation buttons
- Touch-friendly button sizes
- Optimized spacing

## Browser Support

- Modern browsers with ES6+ support
- Touch events for mobile devices
- Keyboard events for desktop navigation
- CSS Grid and Flexbox for layout

## Future Enhancements

Potential improvements that could be added:
- Auto-play functionality
- Infinite scroll option
- Customizable projects per page
- Advanced swipe gestures
- Page transition animations
- URL state management for direct page links 