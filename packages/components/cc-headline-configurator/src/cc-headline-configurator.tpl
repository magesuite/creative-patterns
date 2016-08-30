<form class="cc-headline-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSubmit">
    <div class="cs-input cs-input--type-inline">
        <label for="cfg-headline" class="cs-input__label">Headline:</label>
        <input type="text" v-model="headline.title" id="cfg-headline" class="cs-input__input">
    </div>
    <div class="cs-input cs-input--type-inline">
        <label for="cfg-subheadline" class="cs-input__label">Subheadline:</label>
        <input type="text" v-model="headline.subtitle" id="cfg-subheadline" class="cs-input__input">
    </div>

    <!--{% if button %}
        {% include '../../cs-button/src/cs-button.twig' with {
            'text': {{ button.text }},
            'classes': {{ button.class }},
            'attributes': {
                '@submit.prevent': 'onSubmit'
            }
        } %}
    {% endif %}-->
</form>
