# Grid Column Variation Calculator

A powerful web-based tool designed to help developers and designers calculate and visualize different column split variations for responsive grid layouts. This tool generates ready-to-use code snippets and provides visual previews across different breakpoints.

## Features

### Core Functionality
- Calculate all possible column split variations for a given number of columns (1-8)
- Visual preview of each variation
- Real-time grid layout visualization
- Support for multiple split combinations

### Responsive Breakpoints
- Desktop (≥1024px)
- Tablet (768px-1023px)
- Mobile (<767px)

### Export Options
- JSON export with detailed variation data
- CSV export for spreadsheet compatibility
- HTML/CSS export with ready-to-use code
- Copy to clipboard functionality
- Responsive code snippets for each breakpoint

### Visual Previews
- Interactive grid previews
- Percentage and fraction displays
- Breakpoint-specific layouts
- Color-coded visualization

### Code Generation
- CSS Grid syntax
- Flexbox alternatives
- Percentage-based layouts
- Responsive breakpoint code

## Technical Stack

### Frontend
- HTML5
- CSS3 (Modern Features)
- JavaScript (ES6+ Modules)

### External Resources
- Google Fonts (Poppins)
- Font Awesome Icons (v6.0.0)
- Modern CSS Custom Properties

## Project Structure

```
column-variation-calculator/
├── src/
│   ├── js/
│   │   ├── modules/
│   │   │   ├── calculator.js
│   │   │   ├── export.js
│   │   │   ├── ui.js
│   │   │   └── utils.js
│   │   └── main.js
│   ├── css/
│   │   ├── components/
│   │   │   ├── breakpoints.css
│   │   │   ├── buttons.css
│   │   │   ├── cards.css
│   │   │   ├── export.css
│   │   │   ├── form.css
│   │   │   ├── grid.css
│   │   ├── base.css
│   │   └── main.css
│   └── index.html
├── public/
│   └── assets/
│       └── icons/
├── tests/
├── .gitignore
└── README.md
```

## Core Modules

### Calculator Module
- Handles column split calculations
- Generates responsive variations
- Validates input combinations

### UI Module
- Manages DOM interactions
- Generates visual previews
- Handles error messaging
- Creates code suggestions

### Export Module
- Generates JSON output
- Creates CSV format
- Produces HTML/CSS templates
- Handles clipboard operations

## Styling Architecture

### Key Style Features
- Modular CSS architecture
- Responsive design system
- Custom properties for theming
- Flexible grid layouts
- Interactive UI elements

## Usage

1. **Input Parameters**
   - Enter number of columns (1-8)
   - Specify desired number of splits
   - Click "Calculate Variations"

2. **View Results**
   - See visual grid previews
   - Review responsive breakdowns
   - Access code snippets

3. **Export Options**
   - Download as JSON
   - Export to CSV
   - Get HTML/CSS code
   - Copy to clipboard

## Error Handling
- Input validation
- User-friendly error messages
- Graceful fallbacks
- Visual feedback

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations
- Modular code structure
- Efficient calculations
- Optimized DOM operations
- Responsive image handling

## Future Enhancements
- Additional export formats
- Custom breakpoint configuration
- Style recommendation for tablet and mobile
- Template saving functionality
- Advance fraction calculations
- Accessibility features
- History and favourites
- Unit conversion
- Dark mode

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


