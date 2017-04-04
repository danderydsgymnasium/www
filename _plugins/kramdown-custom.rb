#
# Adds aspect ratio to images during build, for stable loads
#

class Jekyll::Converters::Markdown::KramdownCustom
	autoload :Oga, 'oga'

	def initialize(config)
		require 'kramdown'
		require 'image_size'

		@config = config
	end

	def convert(content)
		html = Kramdown::Document.new(content, {
				:auto_ids							 => @config['kramdown']['auto_ids'],
				:footnote_nr					 => @config['kramdown']['footnote_nr'],
				:entity_output				 => @config['kramdown']['entity_output'],
				:toc_levels						 => @config['kramdown']['toc_levels'],
				:smart_quotes					 => @config['kramdown']['smart_quotes'],
				:kramdown_default_lang => @config['kramdown']['default_lang'],
				:input								 => @config['kramdown']['input'],
				:hard_wrap						 => @config['kramdown']['hard_wrap']
		}).to_html

		html_tree = Oga.parse_html(html)

		html_tree.css('img').each do |img|
			img_src_attr = img.attributes.find { |attr| attr.name == 'src' }

			# Image already has class, was created from HTML, not Markdown. Bail
			if (!!img.attributes.find { |attr| attr.name == 'class' })
				next
			end

			# Add class to img
			img_class_attr = Oga::XML::Attribute.new({
				:name => 'class',
				:value => 'aspect-ratio__content'
			})
			img.attributes.push(img_class_attr)

			# Create ratio wrapper
			ratio = Oga::XML::Element.new({
				:name => 'div'
			})
			ratio_class_attr = Oga::XML::Attribute.new({
				:name => 'class',
				:value => 'aspect-ratio'
			})
			ratio.attributes.push(ratio_class_attr)
			img.replace(ratio)

			# Force aspect ratio
			force = Oga::XML::Element.new({
				:name => 'div'
			})
			force_class_attr = Oga::XML::Attribute.new({
				:name => 'class',
				:value => 'aspect-ratio__force'
			})
			force.attributes.push(force_class_attr)
			image_size = ImageSize.path(Dir.pwd + URI.unescape(img_src_attr.value))
			force_style_attr = Oga::XML::Attribute.new({
				:name => 'style',
				:value => "padding-top:#{image_size.height.to_f / image_size.width.to_f * 100}%;"
			})
			force.attributes.push(force_style_attr)
			ratio.children.insert(0, force)

			# Add img to ratio
			ratio.children.insert(1, img)
		end

		html_tree.to_xml
	end
end
